import type { Ref } from 'vue'
import { watch } from 'vue'

export type TimingFunction = (x: number) => number
export const linear: TimingFunction = x => x

export interface Context<T extends object> {
  target: T
}

export type Animation<A extends object, T extends object = object> =
  (context: Context<T> & A, progress: number) => void

export function defineAnimation<
  A extends object,
  T extends object,
>(animation: Animation<A, T>): Animation<A, T> {
  return animation
}

export function exec<T extends object>(callback: (widget: T) => void) {
  return defineAnimation((context) => {
    callback(context.target as T)
  })
}

export const delay = defineAnimation((context, progress) => {
  // do nothing
})

interface AnimationInstance<A extends object, T extends object> {
  context: Context<T> & A
  animation: Animation<A, T>
  startAt?: number
  duration: number
  by: TimingFunction
}

export class AnimationManager<T extends object> {
  animations: AnimationInstance<any, T>[] = []
  index: number = 0

  constructor(public target: T, elapsed: Ref<number>) {
    watch(elapsed, <A extends object>(elapsed: number) => {
      
      if (this.animations.length === 0) return
      const animation: AnimationInstance<A, T> = this.animations[0]
      if (typeof animation.startAt === 'undefined') {
        animation.startAt = elapsed
        animation.animation(animation.context, 0)
      }
      else {
        const progress = (elapsed - animation.startAt) / (animation.duration ?? (elapsed - animation.startAt))
        animation.animation(animation.context, animation.by(Math.min(progress, 1)))
        if (progress >= 1) {
          this.animations.shift()
          // this.index++
        }
      }
    })
  }

  animate<A extends object>(animation: Animation<A, T>, context?: {
    duration?: number
    by?: TimingFunction
  } & A) {
    context ??= {} as A
    const by = context.by ?? linear
    const duration = context.duration ?? 1
    Object.assign(context, { target: this.target })
    this.animations.push({ context, animation, duration, by })

    return this
  }

  exec(callback: (widget: T) => void) {
    this.animate(exec(callback))

    return this
  }

  delay(duration: number) {
    this.animate(delay, { duration })

    return this
  }
}

export function withDefaults<
  A extends object,
  T extends object,
>(animation: Animation<A, T>, defaults: A): Animation<A, T> {
  return function (context: Context<T> & A, progress: number) {
    if (progress === 0) {
      Object.assign(context, defaults)
    }
    animation(context, progress)
  }
}

export function parallel<
  A extends object,
  T extends object,
>(...animations: Animation<A, T>[]): Animation<A, T> {
  return function (context: Context<T> & A, progress: number) {
    for (const animation of animations) {
      animation(context, progress)
    }
  }
}
