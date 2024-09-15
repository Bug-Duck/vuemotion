import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'
import type { HasOpacity } from './fade'

export interface Strokable {
  borderInterval: number[]
}

export const stroke = defineAnimation<{
  origin?: number
}, Strokable>((context, progress) => {
  context.target.borderInterval = [interpolator(0, context.origin ?? 500, progress), interpolator(context.origin ?? 500, 0, progress)] as number[]
})

export const strokeFill = defineAnimation<{
  origin?: number
}, Strokable & HasOpacity>((context, progress) => {
  context.target.borderInterval = [interpolator(0, context.origin ?? 500, progress), interpolator(context.origin ?? 500, 0, progress)] as number[]
  context.target.opacity = interpolator(0, 1, progress)
})
