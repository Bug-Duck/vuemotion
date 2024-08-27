import { defineAnimation, withDefaults } from '@vuemotion/core'
import { interpolator } from '../interpolator'

export interface HasOpacity {
  opacity?: number
}

export const fadeTo = defineAnimation<{
  from?: number
  to?: number
}, HasOpacity>((context, progress) => {
  if (progress === 0) {
    context.from ??= context.target.opacity ?? 1
    context.to ??= context.target.opacity ?? 1
  }
  context.target.opacity = interpolator(context.from!, context.to!, progress)
})

export const fadeOut = withDefaults(fadeTo, { to: 0 })
export const fadeIn = withDefaults(fadeTo, { to: 1 })
