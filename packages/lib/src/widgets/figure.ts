import type { WidgetMixin, WidgetOptions } from './widget'
import { widget } from './widget'

export interface FigureOptions extends WidgetOptions {
  fillColor?: string
  borderColor?: string
  borderWidth?: number
  borderOffset?: number
  borderInterval?: number[]
}

export type FigureMixin = FigureOptions & WidgetMixin

export function figure(options: FigureOptions) {
  const props = widget(options) as ReturnType<typeof widget> & {
    'fill'?: string
    'stroke'?: string
    'stroke-width'?: number
    'stroke-dashoffset'?: number
    'stroke-dasharray'?: string
  }
  props.fill = options.fillColor ?? 'rgba(135,206,250,0.5)'
  props.stroke = options.borderColor ?? 'rgba(135,206,250,1)'
  props['stroke-width'] = options.borderWidth ?? 2
  if (options.borderOffset)
    props['stroke-dashoffset'] = options.borderOffset
  if (options.borderInterval)
    props['stroke-dasharray'] = options.borderInterval.join(' ')
  return props
}
