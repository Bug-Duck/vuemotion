import {  BaseWidgetOptions } from "./base-widget"

export interface FigureOptions extends BaseWidgetOptions {
  border?: string
  borderWidth?: number
  fill?: string
  color?: string
  offset?: number
  interval?: number[]
}
