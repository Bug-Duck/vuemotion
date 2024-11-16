import type { WatchSource } from 'vue'
import { watch } from 'vue'

export type TimingFunction = (x: number) => number
export const linear: TimingFunction = x => x

export type Animation<T extends object, A extends object = object> =
  (target: T, context: A, progress: number) => void;

type BuildParams<T, Keys extends Array<keyof T>, Optional extends boolean = false> = Keys extends []
  ? [parameters?: Record<string, any>]
  : Keys extends [infer First extends keyof T]
  ? [Optional extends true ? T[First] | undefined : T[First], parameters?: Record<string, any>]
  : Keys extends [infer First extends keyof T, ...infer Rest extends Array<keyof T>]
  ? [Optional extends true ? T[First] | undefined : T[First], ...BuildParams<T, Rest, Optional>, parameters?: Record<string, any>]
  : never

/**
 * If
 * ```ts
 * interface A {
 *   x: number
 *   y: number
 *   z: number
 * }
 * ```
 * Then
 * ```ts
 * type B = Methodize<A, { 
 *   move: ['x', 'y'],
 *   move3d: ['x', 'y', 'z']
 * }>
 * ```
 * is
 * ```ts
 * interface B {
 *   move: (x: number, y: number, parameters?: Record<string, any>) => void
 *   move3d: (x: number, y: number, z: number, parameters?: Record<string, any>) => void
 * }
 * ```
 */
export type Methodize<
  T,
  Methods extends Record<string, Array<keyof T>>,
  Optional extends boolean = false
> = {
  [K in keyof Methods]: (...args: BuildParams<T, Methods[K], Optional>) => void
}

interface AnimationInstance<T extends object, A extends object> {
  context: A
  animation: Animation<T, A>
  startAt?: number
  duration: number | 'once'
  by: TimingFunction
}

export class AnimationManager<T extends object> {
  animations: AnimationInstance<T, any>[] = []

  constructor(target: T, elapsed: WatchSource<number>) {
    watch(elapsed, <A extends object>(elapsed: number) => {
      if (this.animations.length === 0) {
        return
      }
      const {
        context,
        animation,
        duration,
        startAt,
        by,
      }: AnimationInstance<T, A> = this.animations[0]
      if (startAt === undefined) {
        this.animations[0].startAt = elapsed
        animation(target, context, 0)
        if (duration === 'once') {
          this.animations.shift()
        }
      }
      else {
        const progress = (elapsed - startAt) / (duration as number)
        animation(target, context, by(Math.min(progress, 1)))
        if (progress >= 1) {
          this.animations.shift()
        }
      }
    })
  }

  animate<A extends object>(animation: Animation<T, A>, context: {
    duration?: AnimationInstance<T, A>['duration']
    by?: TimingFunction
  } & A) {
    context ??= {} as A
    const duration = context.duration ?? 1
    const by = context.by ?? linear
    this.animations.push({ context, animation, duration, by })

    return this
  }

  once(animation: (target: T) => void) {
    this.animate(animation, { duration: 'once' })

    return this
  }

  delay(duration: number) {
    this.animate(() => { /* empty animation */ }, { duration })

    return this
  }
}

export function defineAnimation<
  T extends object,
  A extends object = object,
>(animation: Animation<T, A>): Animation<T, A>

export function defineAnimation<
  T extends object,
  A extends object = object,
>(
  setup: (target: T, context: A) => (progress: number) => void,
  dispose?: (target: T, context: A) => void
): Animation<T, A>

export function defineAnimation<
  T extends object,
  A extends object = object,
>(...args: [Animation<T, A>] | Parameters<typeof defineAnimation>) {
  if (typeof args[0] === 'function') {
    return args[0] as Animation<T, A>
  }
  const [setup, dispose] = args as Parameters<typeof defineAnimation>
  let animation: (progress: number) => void | undefined
  return function (target: T, context: A, progress: number) {
    (animation ??= setup(target, context))(progress)
    if (dispose && progress === 1) {
      dispose(target, context)
    }
  }
}

export function parallel<
  T extends object,
  A extends object = object,
>(...animations: Animation<T, A>[]): Animation<T, A> {
  return function (target: T, context: A, progress: number) {
    for (const animation of animations) {
      animation(target, context, progress)
    }
  }
}
