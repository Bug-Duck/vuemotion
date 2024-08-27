import { defineAnimation } from '@vuemotion/core'
import { interpolator } from '../interpolator'

export interface Positional {
  x?: number
  y?: number
}

export const move = defineAnimation<{
  fromX?: number
  fromY?: number
  offsetX?: number
  offsetY?: number
}, Positional>((context, progress) => {
  if (progress === 0) {
    context.fromX ??= context.target.x ?? 0
    context.fromY ??= context.target.y ?? 0
    context.offsetX ??= 0
    context.offsetX ??= 0
  }
  context.target.x = context.fromX! + interpolator(0, context.offsetX!, progress)
  context.target.y = context.fromY! + interpolator(0, context.offsetY!, progress)
})

export const moveTo = defineAnimation<{
  fromX?: number
  fromY?: number
  toX?: number
  toY?: number
}, Positional>((context, progress) => {
  if (progress === 0) {
    context.fromX ??= context.target.x ?? 0
    context.fromY ??= context.target.y ?? 0
    context.toX ??= context.target.x ?? 0
    context.toY ??= context.target.y ?? 0
  }
  context.target.x = interpolator(context.fromX!, context.toX!, progress)
  context.target.y = interpolator(context.fromY!, context.toY!, progress)
})
