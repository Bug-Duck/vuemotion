import { defineAnimation } from '@vuemotion/core'
import { interpolator } from '../interpolator'

export const move = defineAnimation<{
  fromX?: number
  fromY?: number
  offsetX?: number
  offsetY?: number
}>((context, progress) => {
  if (progress === 0) {
    context.fromX ??= context.widget.x ?? 0
    context.fromY ??= context.widget.y ?? 0
    context.offsetX ??= 0
    context.offsetX ??= 0
  }
  context.widget.x = context.fromX! + interpolator(0, context.offsetX!, progress)
  context.widget.y = context.fromY! + interpolator(0, context.offsetY!, progress)
})

export const moveTo = defineAnimation<{
  fromX?: number
  fromY?: number
  toX?: number
  toY?: number
}>((context, progress) => {
  if (progress === 0) {
    context.fromX ??= context.widget.x ?? 0
    context.fromY ??= context.widget.y ?? 0
    context.toX ??= context.widget.x ?? 0
    context.toY ??= context.widget.y ?? 0
  }
  context.widget.x = interpolator(context.fromX!, context.toX!, progress)
  context.widget.y = interpolator(context.fromY!, context.toY!, progress)
})
