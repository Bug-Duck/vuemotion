import type { Methodize } from '@vue-motion/core'
import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'

export interface Rotatable {
  rotation?: number
}
export type RotatableMethods = Methodize<Rotatable, { rotateTo: ['rotation'] }>

export const rotate = defineAnimation<{
  from?: number
  offset?: number
}, Rotatable>((context, progress) => {
  if (progress === 0) {
    context.from ??= target.rotation ?? 0
  }
  target.rotation = context.from! + interpolator(0, context.offset!, progress)
})

export const rotateTo = defineAnimation<{
  from?: number
  to?: number
}, Rotatable>((context, progress) => {
  if (progress === 0) {
    context.from ??= target.rotation ?? 0
  }
  target.rotation = interpolator(context.from!, context.to!, progress)
})
