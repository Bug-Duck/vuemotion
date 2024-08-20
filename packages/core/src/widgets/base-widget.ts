import {defineWidget} from "../utils/define-widget.ts";

export interface BaseWidgetOptions {
  x?: number
  y?: number
  // centerX?: number // The rotation center x of the widget.
  // centerY?: number // The rotation center y of the widget.
  progress?: number
  scaleX?: number
  scaleY?: number
  rotation?: number
  // transparency?: number
  // blendMode?: BlendMode
}


export class BaseWidget {
  x: number
  y: number
  progress: number
  scaleX: number
  scaleY: number
  rotation: number
  
  private root: SVGElement
  
  constructor(options: BaseWidgetOptions) {
    this.x = options.x ?? 0
    this.y = options.y ?? 0
    this.progress = options.progress ?? 1
    this.scaleX = options.scaleX ?? 1
    this.scaleY = options.scaleY ?? 1
    this.rotation = options.rotation ?? 0
  }
  
  render() {
    this.root = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.root.setAttribute('transform', `translate(${this.x}, ${this.y}) scale(${this.scaleX}, ${this.scaleY}) rotate(${this.rotation})`)
    return this.root
  }
  
  watch(key: string, newValue: unknown) {
    switch (key) {
      case 'x':
      case 'y':
      case 'scaleX':
      case 'scaleY':
      case 'rotation':
        this.root.setAttribute('transform', `translate(${this.x}, ${this.y}) scale(${this.scaleX}, ${this.scaleY}) rotate(${this.rotation})`)
    }
  }
  
}

export const createBaseWidget = defineWidget<BaseWidgetOptions>(BaseWidget)
