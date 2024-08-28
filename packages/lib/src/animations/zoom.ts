import { defineAnimation, withDefaults } from '@vuemotion/core'
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
    context.fromX ??= context.target.scaleX ?? 1
    context.toX ??= context.target.scaleX ?? 1
    context.fromY ??= context.target.scaleY ?? 1
    context.toY ??= context.target.scaleY ?? 1
  }
  context.target.scaleX = interpolator(context.fromX!, context.toX!, progress)
  context.target.scaleY = interpolator(context.fromY!, context.toY!, progress)
})

export const zoomOut = withDefaults(zoomTo, { toX: 0, toY: 0 })
export const zoomIn = withDefaults(zoomTo, { toX: 1, toY: 1 })
