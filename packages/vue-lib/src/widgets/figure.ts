import {  BaseWidgetOptions } from "./base-widget"

export interface FigureOptions extends BaseWidgetOptions {
  border?: boolean
  borderColor?: string
  borderWidth?: number
  fill?: boolean
  fillColor?: string
  color?: string
  offset?: number
  interval?: number[]
}
