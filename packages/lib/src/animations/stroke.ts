import type { AnimationParams } from '@vue-motion/core'
import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'
import type { HasOpacity } from './fade'

export interface Strokable {
  borderInterval: number[]
}
export interface StrokableMixin extends Strokable {
  stroke: (origin: number, options?: AnimationParams) => void
  strokeFill: (origin: number, options?: AnimationParams) => void
}

export const stroke = defineAnimation<Strokable, {
  origin?: number
}>((target, context) => (progress) => {
  target.borderInterval = [interpolator(0, context.origin ?? 500, progress), interpolator(context.origin ?? 500, 0, progress)] as number[]
})

export const strokeFill = defineAnimation<Strokable & HasOpacity, {
  origin?: number
}>((target, context) => (progress) => {
  target.borderInterval = [interpolator(0, context.origin ?? 500, progress), interpolator(context.origin ?? 500, 0, progress)] as number[]
  target.opacity = interpolator(0, 1, progress)
})
