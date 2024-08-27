import type { WidgetOptions } from './widget'
import { widget } from './widget'

export interface FigureOptions extends WidgetOptions {
  fillColor?: string
  borderColor?: string
  borderWidth?: number
  borderOffset?: number
  borderInterval?: number[]
}

export function figure(options: FigureOptions) {
  const props = widget(options) as ReturnType<typeof widget> & {
    'fill'?: string
    'stroke'?: string
    'stroke-width'?: number
    'stroke-dashoffset'?: number
    'stroke-dasharray'?: string
  }
  if (options.fillColor)
    props.fill = options.fillColor
  if (options.borderColor)
    props.stroke = options.borderColor
  if (options.borderWidth)
    props['stroke-width'] = options.borderWidth
  if (options.borderOffset)
    props['stroke-dashoffset'] = options.borderOffset
  if (options.borderInterval)
    props['stroke-dasharray'] = options.borderInterval.join(' ')
  return props
}
