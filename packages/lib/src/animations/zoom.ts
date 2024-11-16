import { defineAnimation, withDefaults } from '@vue-motion/core'
import { interpolator } from '../interpolator'

export interface HasScale {
  scaleX?: number
  scaleY?: number
}

export const zoomTo = defineAnimation<{
  fromX?: number
  toX?: number
  fromY?: number
  toY?: number
}, HasScale>((context, progress) => {
  if (progress === 0) {
    context.fromX ??= target.scaleX ?? 1
    context.toX ??= target.scaleX ?? 1
    context.fromY ??= target.scaleY ?? 1
    context.toY ??= target.scaleY ?? 1
  }
  target.scaleX = interpolator(context.fromX!, context.toX!, progress)
  target.scaleY = interpolator(context.fromY!, context.toY!, progress)
})

export const zoomOut = withDefaults(zoomTo, { toX: 0, toY: 0 })
export const zoomIn = withDefaults(zoomTo, { toX: 1, toY: 1 })
