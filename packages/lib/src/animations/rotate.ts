import type { AnimationParams } from '@vue-motion/core'
import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'

export interface Rotatable {
  rotation?: number
}

export interface RotatableMixin extends Rotatable {
  rotate: (offset: number, options?: AnimationParams) => void
  rotateTo: (to: number, options?: AnimationParams) => void
}

export const rotate = defineAnimation<Rotatable, {
  from?: number
  offset?: number
}>((target, context) => (progress: number) => {
  if (progress === 0) {
    context.from ??= target.rotation ?? 0
  }
  target.rotation = context.from! + interpolator(0, context.offset!, progress)
})

export const rotateTo = defineAnimation<Rotatable, {
  from?: number
  to?: number
}>((target, context) => (progress) => {
  if (progress === 0) {
    context.from ??= target.rotation ?? 0
  }
  target.rotation = interpolator(context.from!, context.to!, progress)
})
