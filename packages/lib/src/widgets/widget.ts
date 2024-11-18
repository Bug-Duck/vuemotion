import type { AnimationParams, Widget } from '@vue-motion/core'
import { registerAnimation } from '@vue-motion/core'
import type { HasOpacity, HasOpacityMixin, HasScale, HasScaleMixin, Positional, PositionalMixin, Rotatable, RotatableMixin, Scalable, StrokableMixin } from '../animations'
import { fadeIn, fadeOut, fadeTo } from '../animations/fade'
import { move, moveTo } from '../animations/move'
import { rotate, rotateTo } from '../animations/rotate'
import { scale, scaleTo } from '../animations/scale'
import { zoomIn, zoomOut, zoomTo } from '../animations/zoom'

export type WidgetOptions = Widget & Positional & Scalable & Rotatable & HasOpacity
export type WidgetMixin = WidgetOptions & PositionalMixin & RotatableMixin & HasScaleMixin & StrokableMixin & HasOpacityMixin

export function widget(options: WidgetOptions) {
  const props = {} as {
    transform?: string
    style?: string
  }
  const transform = []
  if (options.x || options.y)
    transform.push(`translate(${options.x ?? 0},${options.y ?? 0})`)
  if (options.scaleX || options.scaleY)
    transform.push(`scale(${options.scaleX ?? 1}, ${options.scaleY ?? 1})`)
  if (options.rotation)
    transform.push(`rotate(${options.rotation})`)
  if (transform.length > 0)
    props.transform = transform.join(' ')
  if (options.opacity !== 1)
    props.style = `opacity: ${options.opacity}`

  registerAnimation<Positional>('move', (offsetX: number, offsetY: number, params?: AnimationParams) => {
    return (manager) => manager.animate(move, {
      offsetX,
      offsetY,
      duration: 1 ?? params?.duration,
    })
  })
  registerAnimation<Positional>('moveTo', (toX: number, toY: number, params?: AnimationParams) => {
    return (manager) => manager.animate(moveTo, {
      toX,
      toY,
      duration: 1 ?? params?.duration,
    })
  })
  registerAnimation<Scalable>('scale', (offsetX: number, offsetY: number, params?: AnimationParams) => {
    return (manager) => manager.animate(scale, {
      offsetX,
      offsetY,
      duration: 1 ?? params?.duration,
    })
  })
  registerAnimation<Scalable>('scaleTo', (toX: number, toY: number, params?: AnimationParams) => {
    return (manager) => manager.animate(scaleTo, {
      toX,
      toY,
      duration: 1 ?? params?.duration,
    })
  })
  registerAnimation<Rotatable>('rotate', (offset: number, params?: AnimationParams) => {
    return (manager) => manager.animate(rotate, {
      offset,
      duration: 1 ?? params?.duration,
    })
  })
  registerAnimation<Rotatable>('rotateTo', (to: number, params?: AnimationParams) => {
    return (manager) => manager.animate(rotateTo, {
      to,
      duration: 1 ?? params?.duration,
    })
  })
  registerAnimation<HasOpacity>('fadeTo', (to: number, params?: AnimationParams) => {
    return (manager) => manager.animate(fadeTo, {
      to,
      duration: 1 ?? params?.duration,
    })
  })
  registerAnimation<HasOpacity>('fadeIn', (params?: AnimationParams) => {
    return (manager) => manager.animate(fadeIn, {
      duration: 1 ?? params?.duration,
    })
  })
  registerAnimation<HasOpacity>('fadeOut', (params?: AnimationParams) => {
    return (manager) => manager.animate(fadeOut, {
      duration: 1 ?? params?.duration,
    })
  })
  registerAnimation<HasScale>('zoomTo', (toX: number, toY: number, params?: AnimationParams) => {
    return (manager) => manager.animate(zoomTo, {
      toX,
      toY,
      duration: 1 ?? params?.duration,
    })
  })
  registerAnimation<HasScale>('zoomIn', (params?: AnimationParams) => {
    return (manager) => manager.animate(zoomIn, {
      duration: 1 ?? params?.duration,
    })
  })
  registerAnimation<HasScale>('zoomOut', (params?: AnimationParams) => {
    return (manager) => manager.animate(zoomOut, {
      duration: 1 ?? params?.duration,
    })
  })

  return props
}
