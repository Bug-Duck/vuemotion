import type { Widget } from '@vuemotion/core'

export type Point = [number, number]
export interface Grownable extends Widget {
  progress?: number
}

// eslint-disable-next-line ts/no-unsafe-function-type
type NativeType = null | number | string | boolean | symbol | Function
type InferDefault<P, T> = ((props: P) => T & {}) | (T extends NativeType ? T : never)
type InferDefaults<T> = {
  [K in keyof T]?: InferDefault<T, T[K]>;
}
type Defaults<T extends Widget> = Required<InferDefaults<Omit<T, 'wid'>>>

export const WidgetDefaults: Defaults<Widget> = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  opacity: 1,
}

export interface Figure extends Widget {
  fillColor?: string
  borderColor?: string
  borderWidth?: number
  borderOffset?: number
  borderInterval?: number[]
}

export const FigureDefaults: Defaults<Figure> = {
  ...WidgetDefaults,
  fillColor: 'rgba(135,206,250,0.5)',
  borderColor: 'rgba(135,206,250,1)',
  borderWidth: 1,
  borderOffset: 0,
  borderInterval: () => [1, 0],
}

export interface Text extends Figure {
  fontSize?: | 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large' | 'larger' | 'smaller' | string & {}
  fontFamily?: string
  fontWeight?: number | 'normal' | 'bold' | 'bolder' | 'lighter'
  fontStyle?: 'normal' | 'italic' | 'oblique'
  align?: 'start' | 'middle' | 'end'
  baseline?: 'top' | 'middle' | 'bottom'
  decoration?: 'none' | 'underline' | 'overline' | 'line-through' | 'blink'
  wordSpacing?: number
  letterSpacing?: number
}

export const textDefaults: Defaults<Text> = {
  ...FigureDefaults,
  fillColor: 'white',
  borderColor: 'none',
  fontSize: 'medium',
  fontFamily: 'unset',
  fontWeight: 'normal',
  fontStyle: 'normal',
  align: 'middle',
  baseline: 'middle',
  decoration: 'none',
  wordSpacing: 0,
  letterSpacing: 0,
}
