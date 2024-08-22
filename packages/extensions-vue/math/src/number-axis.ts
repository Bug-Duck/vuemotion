import { BaseWidgetOptions } from "@vuemotion/vue-lib"

export interface NumberAxisOptions extends BaseWidgetOptions{
  interval?: number
  trend?: (count: number) => string
  tip?: string // Arrow tip color or 'none'
  trim?: string // Arrow trim color or 'none'
  fontColor?: string // Font color
  fontSize?: number // Font size
  range: [number, number]
}