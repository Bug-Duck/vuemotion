import { defineAnimation } from '@vuemotion/core'
import { interpolator } from '../interpolator'

export interface Rotatable {
  rotation?: number
}

export const rotate = defineAnimation<{
  from?: number
  offset?: number
}, Rotatable>((context, progress) => {
  if (progress === 0) {
    context.from ??= context.target.rotation ?? 0
  }
  context.target.rotation = context.from! + interpolator(0, context.offset!, progress)
})

export const rotateTo = defineAnimation<{
  from?: number
  to?: number
}, Rotatable>((context, progress) => {
  if (progress === 0) {
    context.from ??= context.target.rotation ?? 0
  }
  context.target.rotation = interpolator(context.from!, context.to!, progress)
})
