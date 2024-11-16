import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'
import type { Scalable } from './scale'

export const indicate = defineAnimation<object, Scalable>((context, progress) => {
  if (progress >= 0 && progress <= 0.3) {
    target.scaleX = interpolator(1, 1.3, progress / 0.3)
    target.scaleY = interpolator(1, 1.3, progress / 0.3)
  }
  if (progress >= 0.7 && progress <= 1) {
    target.scaleX = interpolator(1.3, 1, (progress - 0.7) / 0.3)
    target.scaleY = interpolator(1.3, 1, (progress - 0.7) / 0.3)
  }
})
