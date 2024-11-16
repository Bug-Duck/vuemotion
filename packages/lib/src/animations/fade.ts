import type { Methodize } from '@vue-motion/core'
import { defineAnimation, withDefaults } from '@vue-motion/core'
import { interpolator } from '../interpolator'

export interface HasOpacity {
  opacity?: number
}
export type HasOpacityMethods = Methodize<HasOpacity, { fadeTo: ['opacity'] }>

export const fadeTo = defineAnimation<{
  from?: number
  to?: number
}, HasOpacity>((context, progress) => {
  if (progress === 0) {
    context.from ??= target.opacity ?? 1
    context.to ??= target.opacity ?? 1
  }
  target.opacity = interpolator(context.from!, context.to!, progress)
})

export const fadeOut = withDefaults(fadeTo, { to: 0 })
export const fadeIn = withDefaults(fadeTo, { to: 1 })
