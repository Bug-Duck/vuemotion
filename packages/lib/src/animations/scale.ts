import { defineAnimation } from '@vuemotion/core'
import { interpolator } from '../interpolator'

export const scale = defineAnimation<{
  fromX?: number
  fromY?: number
  offsetX?: number
  offsetY?: number
}>((context, progress) => {
  if (progress === 0) {
    context.fromX ??= context.widget.scaleX ?? 1
    context.fromY ??= context.widget.scaleY ?? 1
    context.offsetX ??= 0
    context.offsetX ??= 0
  }
  context.widget.scaleX = context.fromX! * interpolator(1, context.offsetX!, progress)
  context.widget.scaleY = context.fromY! * interpolator(1, context.offsetY!, progress)
})

export const scaleTo = defineAnimation<{
  fromX?: number
  fromY?: number
  toX?: number
  toY?: number
}>((context, progress) => {
  if (progress === 0) {
    context.fromX ??= context.widget.scaleX ?? 1
    context.fromY ??= context.widget.scaleY ?? 1
    context.toX ??= context.widget.scaleX ?? 1
    context.toY ??= context.widget.scaleY ?? 1
  }
  context.widget.scaleX = interpolator(context.fromX!, context.toX!, progress)
  context.widget.scaleY = interpolator(context.fromY!, context.toY!, progress)
})
