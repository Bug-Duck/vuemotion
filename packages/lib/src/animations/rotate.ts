import { defineAnimation } from '@vuemotion/core'
import { interpolator } from '../interpolator'

export const rotate = defineAnimation<{
  from?: number
  offset?: number
}>((context, progress) => {
  if (progress === 0) {
    context.from ??= context.widget.rotation ?? 0
  }
  context.widget.rotation = context.from! + interpolator(0, context.offset!, progress)
})

export const rotateTo = defineAnimation<{
  from?: number
  to?: number
}>((context, progress) => {
  if (progress === 0) {
    context.from ??= context.widget.rotation ?? 0
  }
  context.widget.rotation = interpolator(context.from!, context.to!, progress)
})
