import type { AnimationParams, Widget } from '@vue-motion/core'
import { registerAnimation } from '@vue-motion/core'
import { inject } from 'vue'
import { type HasOpacity, type HasOpacityMixin, type HasScale, type HasScaleMixin, type Positional, type PositionalMixin, type Rotatable, type RotatableMixin, type Scalable, type StrokableMixin, moveOnFunction, moveOnPath } from '../animations'
import { fadeIn, fadeOut, fadeTo, move, moveTo, rotate, rotateTo, scale, scaleTo, zoomIn, zoomOut, zoomTo } from '../animations'
import type { Colorable, colorableMixin } from '../animations/color'
import { discolorate } from '../animations/color'

export type WidgetOptions = Widget & Positional & Scalable & Rotatable & HasOpacity & Colorable
export type WidgetMixin = WidgetOptions & PositionalMixin & RotatableMixin & HasScaleMixin & StrokableMixin & HasOpacityMixin & colorableMixin

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

  const defaultDuration = 1

  registerAnimation<Positional>('move', (offsetX: number, offsetY: number, params?: AnimationParams) => {
    return (manager) => manager.animate(move, {
      offsetX,
      offsetY,
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<Positional>('moveTo', (toX: number, toY: number, params?: AnimationParams) => {
    return (manager) => manager.animate(moveTo, {
      toX,
      toY,
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<Scalable>('scale', (offsetX: number, offsetY: number, params?: AnimationParams) => {
    return (manager) => manager.animate(scale, {
      offsetX,
      offsetY,
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<Scalable>('scaleTo', (toX: number, toY: number, params?: AnimationParams) => {
    return (manager) => manager.animate(scaleTo, {
      toX,
      toY,
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<Rotatable>('rotate', (offset: number, params?: AnimationParams) => {
    return (manager) => manager.animate(rotate, {
      offset,
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<Rotatable>('rotateTo', (to: number, params?: AnimationParams) => {
    return (manager) => manager.animate(rotateTo, {
      to,
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<HasOpacity>('fadeTo', (to: number, params?: AnimationParams) => {
    return (manager) => manager.animate(fadeTo, {
      to,
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<HasOpacity>('fadeIn', (params?: AnimationParams) => {
    return (manager) => manager.animate(fadeIn, {
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<HasOpacity>('fadeOut', (params?: AnimationParams) => {
    return (manager) => manager.animate(fadeOut, {
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<HasScale>('zoomTo', (toX: number, toY: number, params?: AnimationParams) => {
    return (manager) => manager.animate(zoomTo, {
      toX,
      toY,
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<HasScale>('zoomIn', (params?: AnimationParams) => {
    return (manager) => manager.animate(zoomIn, {
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<HasScale>('zoomOut', (params?: AnimationParams) => {
    return (manager) => manager.animate(zoomOut, {
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<Colorable>('discolorate', (on: 'fill' | 'border' | 'color', offset: string, params?: AnimationParams) => {
    return (manager) => manager.animate(discolorate, {
      offset,
      on,
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<Positional>('moveOnPath', (path: string, params?: AnimationParams) => {
    return (manager) => manager.animate(moveOnPath, {
      path,
      duration: params?.duration ?? defaultDuration,
    })
  })
  registerAnimation<Positional>('moveOnFunction', (path: (progress: number) => { x: number, y: number }, params?: AnimationParams) => {
    return (manager) => manager.animate(moveOnFunction, {
      path,
      duration: params?.duration ?? defaultDuration,
    })
  })
  const animations = inject<(() => void)[]>('ADDITION_ANIMATIONS')
  animations?.forEach((animation) => animation())

  return props
}
