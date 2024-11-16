import type { Methodize } from '@vue-motion/core'
import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'

export interface Positional {
  x?: number
  y?: number
}
export type PositionalMethods = Methodize<Positional, { moveTo: ['x', 'y'] }>

export const move = defineAnimation<{
  fromX?: number
  fromY?: number
  offsetX?: number
  offsetY?: number
}, Positional>((context, progress) => {
  if (progress === 0) {
    context.fromX ??= target.x ?? 0
    context.fromY ??= target.y ?? 0
    context.offsetX ??= 0
    context.offsetX ??= 0
  }
  target.x = context.fromX! + interpolator(0, context.offsetX!, progress)
  target.y = context.fromY! + interpolator(0, context.offsetY!, progress)
})

export const moveTo = defineAnimation<{
  fromX?: number
  fromY?: number
  toX?: number
  toY?: number
}, Positional>((context, progress) => {
  if (progress === 0) {
    context.fromX ??= target.x ?? 0
    context.fromY ??= target.y ?? 0
    context.toX ??= target.x ?? 0
    context.toY ??= target.y ?? 0
  }
  target.x = interpolator(context.fromX!, context.toX!, progress)
  target.y = interpolator(context.fromY!, context.toY!, progress)
})
