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
    this.border = options.border ?? true
    this.borderColor = options.color ?? options.borderColor ?? 'skyblue'
    this.borderWidth = options.borderWidth ?? 5
    this.fill = options.fill ?? true
    this.fillColor = options.color ?? options.fillColor ?? 'rgba(136,206,250,0.5)'
    this.color = options.color ??  'white'
    this.offset = options.offset ?? 0
    this.interval = options.interval ?? [1, 0]
  }

  render(): SVGElement {
    const root = super.render()
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    if (this.fill) {
      group.setAttribute('fill', this.fillColor);
    }
    if (this.border) {
      group.setAttribute('stroke', this.borderColor);
      group.setAttribute('stroke-width', this.borderWidth.toString())
    }
    root.appendChild(group)
    return root
  }
}

export const createFigure = defineWidget<FigureOptions, Figure>(Figure)
