import { defineAnimation, withDefaults } from '@vuemotion/core'
import { interpolator } from '../interpolator'

export const fadeTo = defineAnimation<{
  from?: number
  to?: number
}>((context, progress) => {
  if (progress === 0) {
    context.from ??= context.widget.opacity ?? 1
    context.to ??= context.widget.opacity ?? 1
  }
  context.widget.opacity = interpolator(context.from!, context.to!, progress)
})

export const fadeOut = withDefaults(fadeTo, { to: 0 })
export const fadeIn = withDefaults(fadeTo, { to: 1 })
