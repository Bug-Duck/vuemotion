import {BaseWidget, BaseWidgetOptions} from "./base-widget.ts"
import {defineWidget} from "../utils/define-widget.ts";

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

export class Figure extends BaseWidget {
  border: boolean
  borderColor: string
  borderWidth: number
  fill: boolean
  fillColor: string
  color: string
  offset: number
  interval: number[]
  
  constructor(options: FigureOptions) {
    super(options)
    this.border = options.border ?? false
    this.borderColor = options.color ?? options.borderColor ?? 'white'
    this.borderWidth = options.borderWidth ?? 2
    this.fill = options.fill ?? true
    this.fillColor = options.color ?? options.fillColor ?? 'white'
    this.color = options.color ??  'white'
    this.offset = options.offset ?? 0
    this.interval = options.interval ?? [1, 0]
  }
}

export const createFigure = defineWidget<FigureOptions>(Figure)
