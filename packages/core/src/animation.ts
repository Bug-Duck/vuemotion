import type { Ref } from 'vue'
import { inject, watch } from 'vue'
import type { Widget, WidgetRef } from './widget'
import type { Player } from './player'

export type TimingFunction = (x: number) => number
export const linear: TimingFunction = x => x

export interface Context<T extends Widget> {
  widget: T
}

export type Animation<A extends object, T extends Widget = Widget> =
  (context: Context<T> & A, progress: number) => void

export function defineAnimation<
  A extends object,
  T extends Widget = Widget,
>(animate: Animation<A, T>): Animation<A, T> {
  return animate
}

interface AnimationInstance<A extends object, T extends Widget> {
  context: Context<T> & A
  animation: Animation<A, T>
  startAt?: number
  duration: number
  by: TimingFunction
}

export class AnimationManager<T extends Widget> {
  animations: AnimationInstance<any, T>[] = []

  constructor(public widget: T, elapsed: Ref<number>) {
    watch(elapsed, <A extends object>(elapsed: number) => {
      if (this.animations.length === 0) {
        return
      }
      const animation: AnimationInstance<A, T> = this.animations[0]
      if (animation.startAt === undefined) {
        animation.startAt = elapsed
        animation.animation(animation.context, 0)
      }
      else {
        const progress = (elapsed - animation.startAt) / animation.duration
        animation.animation(animation.context, animation.by(Math.min(progress, 1)))
        if (progress >= 1) {
          this.animations.shift()
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
    Object.assign(context, { widget: this.widget })
    this.animations.push({ context, animation, duration, by })

    return this
  }
}

export function useAnimation<T extends Widget>(widget: WidgetRef<T>, player?: Player) {
  return new AnimationManager(widget.props, player?.elapsed ?? inject('elapsed')!)
}

export function withDefaults<
  A extends object,
  T extends Widget = Widget,
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
  T extends Widget = Widget,
>(...animations: Animation<A, T>[]): Animation<A, T> {
  return function (context: Context<T> & A, progress: number) {
    for (const animation of animations) {
      animation(context, progress)
    }
  }
}
