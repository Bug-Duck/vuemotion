import { type Widget, defineMethods } from '@vue-motion/core'
import type { HasOpacity, HasOpacityMethods, Positional, PositionalMethods, Rotatable, RotatableMethods, Scalable, ScalableMethods } from '../animations'

export type WidgetOptions = Widget & Positional & Scalable & Rotatable & HasOpacity
export type WidgetMethods = PositionalMethods & ScalableMethods & RotatableMethods & HasOpacityMethods

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
  return props
}

export function buildWidgetMethods(methods?: WidgetMethods) {
  return defineMethods<WidgetMethods>({
    ...methods!,
    moveTo(x?: number, y?: number, parameters?: {}) {},
  })
}
