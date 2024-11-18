import type { WidgetOptions } from '@vue-motion/lib'

export interface Widget3DOptions extends WidgetOptions {
  x?: number
  y?: number
  z?: number
  rx?: number
  ry?: number
  rz?: number
  scaleX?: number
  scaleY?: number
  scaleZ?: number
  opacity?: number
}
