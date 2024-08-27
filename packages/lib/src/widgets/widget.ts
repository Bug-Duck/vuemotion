import type { Widget } from '@vuemotion/core'
import type { HasOpacity, Positional, Rotatable, Scalable } from '../animations'

export type WidgetOptions = Widget & Positional & Scalable & Rotatable & HasOpacity

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
