import type { Widget } from '@vuemotion/core'
import type { HasOpacity, Positional, Rotatable, Scalable } from '../animations'

export type WidgetOptions = Widget & Positional & Scalable & Rotatable & HasOpacity

export function widget(options: WidgetOptions) {
  const props = {} as {
    transform?: string
    style?: string
  }
  const transform = []
  if (options.x && options.y)
    transform.push(`translate(${options.x},${options.y})`)
  else if (options.x)
    transform.push(`translateX(${options.x})`)
  else if (options.y)
    transform.push(`translateY(${options.y})`)
  if (options.scaleX && options.scaleY)
    transform.push(`scale(${options.scaleX}, ${options.scaleY})`)
  else if (options.scaleY)
    transform.push(`scaleY(${options.scaleY})`)
  else if (options.scaleX)
    transform.push(`scaleX(${options.scaleX})`)
  if (options.rotation)
    transform.push(`rotate(${options.rotation}`)
  if (transform.length > 0)
    props.transform = transform.join(' ')
  if (options.opacity !== 1)
    props.style = `opacity: ${options.opacity}`
  return props
}
