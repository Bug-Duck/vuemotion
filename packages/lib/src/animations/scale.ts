import { defineAnimation } from '@vuemotion/core'
import { interpolator } from '../interpolator'

export interface Scalable {
  scaleX?: number
  scaleY?: number
}

export const scale = defineAnimation<{
  fromX?: number
  fromY?: number
  offsetX?: number
  offsetY?: number
}, Scalable>((context, progress) => {
  if (progress === 0) {
    context.fromX ??= context.target.scaleX ?? 1
    context.fromY ??= context.target.scaleY ?? 1
    context.offsetX ??= 0
    context.offsetX ??= 0
  }
  context.target.scaleX = context.fromX! * interpolator(1, context.offsetX!, progress)
  context.target.scaleY = context.fromY! * interpolator(1, context.offsetY!, progress)
})

export const scaleTo = defineAnimation<{
  fromX?: number
  fromY?: number
  toX?: number
  toY?: number
}, Scalable>((context, progress) => {
  if (progress === 0) {
    context.fromX ??= context.target.scaleX ?? 1
    context.fromY ??= context.target.scaleY ?? 1
    context.toX ??= context.target.scaleX ?? 1
    context.toY ??= context.target.scaleY ?? 1
  }
  context.target.scaleX = interpolator(context.fromX!, context.toX!, progress)
  context.target.scaleY = interpolator(context.fromY!, context.toY!, progress)
})
