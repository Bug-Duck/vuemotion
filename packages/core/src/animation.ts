import { BaseWidget } from "./widgets/base-widget";

export interface AnimationContext<T extends BaseWidget> {
  tag: SVGElement;
  widget: T;
}

export interface BaseAnimation {
  duration: number;
  by?: (t: number) => number; // easing function that determines the progress
}

export function defineAnimation<T extends BaseWidget>(
  input: (context: AnimationContext<T>) => void
) {
  return input;
}

export function defineAttributesAnimation<T extends BaseWidget>(
  input: (context: AnimationContext<T>) => {
    duration: number;
    target: T;
    key: string;
    from?: number | Array<number>;
    to?: number | Array<number>;
    by?: (t: number) => number;
  }
) {
  return defineAnimation<T>(async (context) => {
    await new Promise<void>((resolve) => {
      const beginTime = performance.now();
      let { duration, target, key, from = 0, to = 1, by = (t: number) => t } = input(context)

      duration *= 1000

      function change() {
        const elapsed = performance.now() - beginTime;
        const progress = Math.min(elapsed / duration, 1); // Clamps progress to [0, 1]
        const easedProgress = by(progress); // Apply easing function

        if (Array.isArray(from) && Array.isArray(to)) {
          const values = from.map((start, index) => {
            const end = to[index];
            return start + (end - start) * easedProgress;
          });
          (target as Record<string, unknown>)[key] = values;
        } else if (typeof from === "number" && typeof to === "number") {
          const value = from + (to - from) * easedProgress
          ;(target as Record<string, unknown>)[key] = value
        }

        if (progress < 1) {
          requestAnimationFrame(change);
        } else {
          resolve();
        }
      }

      requestAnimationFrame(change);
    });
  });
}
