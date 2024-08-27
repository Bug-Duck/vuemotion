import type { FigureOptions } from './figure'
import { figure } from './figure'

export interface TextOptions extends FigureOptions {
  fontFamily?: string
  fontSize?: | 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large' | 'larger' | 'smaller' | string & {}
  fontWeight?: number | 'normal' | 'bold' | 'bolder' | 'lighter'
  fontStyle?: 'normal' | 'italic' | 'oblique'
  align?: 'start' | 'middle' | 'end'
  baseline?: 'top' | 'middle' | 'bottom'
  decoration?: 'none' | 'underline' | 'overline' | 'line-through' | 'blink'
  wordSpacing?: number
  letterSpacing?: number
}

export function text(options: TextOptions) {
  const props = {
    ...figure(options),
  } as ReturnType<typeof figure> & {
    'font-family'?: string
    'font-size'?: TextOptions['fontSize']
    'font-weight'?: TextOptions['fontWeight']
    'font-style'?: TextOptions['fontStyle']
    'text-anchor'?: TextOptions['align']
    'dominant-baseline'?: TextOptions['baseline']
    'text-decoration'?: TextOptions['decoration']
    'word-spacing'?: number
    'letter-spacing'?: number
  }
  if (options.fontFamily)
    props['font-family'] = options.fontFamily
  if (options.fontSize)
    props['font-size'] = options.fontSize
  if (options.fontWeight)
    props['font-weight'] = options.fontWeight
  if (options.fontStyle)
    props['font-style'] = options.fontStyle
  if (options.align)
    props['text-anchor'] = options.align
  if (options.baseline)
    props['dominant-baseline'] = options.baseline
  if (options.decoration)
    props['text-decoration'] = options.decoration
  if (options.wordSpacing)
    props['word-spacing'] = options.wordSpacing
  if (options.letterSpacing)
    props['letter-spacing'] = options.letterSpacing
  return props
}
