import type { Ref, WatchSource } from "vue";
import { getCurrentInstance, ref, watch } from "vue";
import { usePlayer } from "./player";

export type TimingFunction = (x: number) => number;
export const linear: TimingFunction = (x) => x;

export type Animation<T, A = object> = (
  target: T,
  context: A,
  progress: number,
) => void;

export interface AnimationInstance<T, A> {
  context: A;
  animation: Animation<T, A>;
  startAt?: number;
  duration: number | "once";
  by: TimingFunction;
}

export class AnimationManager<T> {
  animations: AnimationInstance<T, any>[] = [];
  repeatStatus: [
    boolean,
    number | "loop",
    number,
    AnimationInstance<T, any>[],
  ] = [false, 0, 0, []];
  private target: T;

  constructor(target: T, elapsed: WatchSource<number>) {
    this.target = target;
    watch(elapsed, <A>(elapsed: number) => {
      if (this.animations.length === 0) {
        return;
      }
      const {
        context,
        animation,
        duration,
        startAt,
        by,
      }: AnimationInstance<T, A> = this.animations[0];
      if (startAt === undefined) {
        this.animations[0].startAt = elapsed;
        animation(target, context, 0);
        if (duration === "once") {
          this.animations.shift();
        }
      } else {
        const progress = (elapsed - startAt) / (duration as number);
        animation(target, context, by(Math.min(progress, 1)));
        if (progress >= 1) {
          this.animations.shift();
        }
      }
    });
  }

  animate<A>(
    animation: Animation<T, A>,
    context: {
      duration?: AnimationInstance<T, A>["duration"];
      by?: TimingFunction;
    } & A,
  ) {
    context ??= {} as any;
    const duration = context.duration ?? 1;
    const by = context.by ?? linear;

    if (this.repeatStatus[0]) {
      // 在重复模式中，将动画保存到重复区间
      this.repeatStatus[3].push({ context, animation, duration, by });
    }
    this.animations.push({ context, animation, duration, by });
    return this;
  }

  once(animation: (target: T) => void) {
    this.animate(animation, { duration: "once" });

    return this;
  }

  delay(duration: number) {
    return this.animate(
      () => {
        /* empty animation */
      },
      { duration },
    );
  }

  parallel<A>(
    ...animations: (
      | (() => [Animation<T, A>, A])
      | ((target: T & { manager: AnimationManager<T> }) => void)
    )[]
  ) {
    type ParallelResult =
      | AnimationInstance<T, A>
      | {
          animation: Animation<T, A>;
          context: A;
          duration?: number;
          by?: TimingFunction;
        };

    // Create a non-reactive temporary array
    const tempAnimations: AnimationInstance<T, any>[] = [];

    // Store the original push method
    const originalAnimations = this.animations;
    this.animations = tempAnimations; // Temporarily replace the animations array

    // Collect all animations
    animations.forEach((fn) => {
      fn({ ...this.target, manager: this } as T & {
        manager: AnimationManager<T>;
      });

      if (tempAnimations.length === 0) {
        throw new Error("No animation was registered in parallel callback");
      }
    });

    // Restore original animations array
    this.animations = originalAnimations;

    // Create the parallel animation
    this.animate(
      (target, _, progress) => {
        // Execute all animations simultaneously with the same progress
        tempAnimations.forEach((result: ParallelResult) => {
          result.animation(target, result.context, progress);
        });
      },
      { duration: 1 },
    );

    return this;
  }

  exec(fn: () => void) {
    return this.animate(
      defineAnimation(() => (progress) => {
        if (progress === 0) fn();
      }),
      { duration: 0 },
    );
  }

  repeat(times?: number) {
    this.repeatStatus = [true, times ?? "loop", 0, []];
    return this;
  }

  repeatEnd(fn?: () => void) {
    // 当前重复次数加1
    this.repeatStatus[2] += 1;

    if (
      this.repeatStatus[1] === "loop" ||
      this.repeatStatus[2] < this.repeatStatus[1]
    ) {
      // 如果是无限循环或者还没达到总重复次数，将重复区间的动画再次添加到队列
      this.animations.push(...this.repeatStatus[3]);

      if (this.repeatStatus[1] === "loop") {
        // 如果是无限循环，重置当前重复次数
        this.repeatStatus[2] = 0;
      }
    } else {
      // 重复完成
      this.repeatStatus[0] = false;
      this.repeatStatus[3] = [];
      fn?.();
    }
    return this;
  }
}

export type AnimationSetup<T, A> = (
  target: T,
  context: A,
) => (progress: number) => void;
export function defineAnimation<T, A = object>(setup: AnimationSetup<T, A>) {
  let animation: (progress: number) => void | undefined;
  return function (target: T, context: A, progress: number): void {
    if (progress === 0) {
      animation = setup(target, context);
    }
    animation!(progress);
  };
}

export function registerAnimation<T>(
  name: string,
  setup: (...args: any[]) => (animate: AnimationManager<T>) => void,
  widgetInstance?: any,
): void {
  const current = getCurrentInstance();
  const { widget } = current?.props as {
    widget: T & { manager?: AnimationManager<T> };
  };
  if (widget) {
    if (typeof widget.manager === "undefined") {
      const elapsed: Ref<number> = ref(0);
      if (widgetInstance && widgetInstance.elapsed) {
        elapsed.value = widgetInstance.elapsed!;
        watch(widgetInstance, (v) => {
          elapsed.value = v.elapsed!;
        });
      } else {
        watch(usePlayer().elapsed, (v) => {
          elapsed.value = v;
          console.log(v);
        });
      }
      widget.manager = new AnimationManager<T>(widget, elapsed);
    }
    (widget as Record<string, any>)[name] = (
      ...args: Parameters<typeof setup>
    ): void => {
      setup(...args)(widget.manager!);
    };
  }
}

export interface AnimationParams {
  duration?: number;
  by?: TimingFunction;
}
