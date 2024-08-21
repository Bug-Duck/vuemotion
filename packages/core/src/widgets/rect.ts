import { defineWidget } from "../utils/define-widget"
import { Figure, FigureOptions } from "./figure"

export interface RectOptions extends FigureOptions {
  width: number
  height: number
  /**
   * The corner radius of the rectangle.
   * @default 0
   * @description
   * The corner radius can be a single number, in which case all corners will have the same radius.
   * It can also be an array of 2 numbers, in which case the first number will be the radius of the top-left and top-right corners, and the second number will be the radius of the bottom-left and bottom-right corners.
   * It can also be an array of 4 numbers, in which case the first number will be the radius of the top-left corner, the second number will be the radius of the top-right corner, the third number will be the radius of the bottom-right corner, and the fourth number will be the radius of the bottom-left corner.
   * It can also be an array of 8 numbers, in which case in order, the numbers will be radiusX, radiusY for upper-left, upper-right, lower-right, lower-left.
   */
  radius?: number
  | [number, number]
  | [number, number, number, number]
  | [number, number, number, number, number, number, number, number]
}

export class Rect extends Figure {
  width: number
  height: number
  path: SVGPathElement
  pathData: string

  constructor(options: RectOptions) {
    super(options)
    this.width = options.width ?? 100
    this.height = options.height ?? 100
  }

  render(): SVGElement {
    const root = super.render();

    // Create the SVG `path` element
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.path.id = 'graph';

    // Define the rectangle path
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    this.pathData = `
      M ${-halfWidth},${-halfHeight} 
      h ${this.width} 
      v ${this.height} 
      h ${-this.width} 
      Z
    `

    this.path.setAttribute('d', this.pathData);

    // Apply fill color if specified
    if (this.fill) {
      this.path.setAttribute('fill', this.fillColor);
    } else {
      this.path.setAttribute('fill', 'none'); // Ensure there's no fill if none is specified
    }

    // Apply stroke (border) if specified
    if (this.border) {
      this.path.setAttribute('stroke', this.borderColor);
      this.path.setAttribute('stroke-width', this.borderWidth.toString());
    } else {
      this.path.setAttribute('stroke', 'none'); // Ensure there's no stroke if none is specified
    }

    // Remove any existing `transform` attribute from the root
    root.removeAttribute('transform');

    // Apply the new `transform` attribute for scaling and rotating
    root.setAttribute('transform', `scale(${this.scaleX}, ${this.scaleY}) rotate(${this.rotation})`);

    // Append the path to the root element
    root.appendChild(this.path);

    return root;

  }

  watch(key: string, newValue: unknown): void {
    super.watch(key, newValue)
    switch (key) {
      case 'width':
      case 'height':
      case 'progress':
        this.render()
    }
  }
}

export const createRect = defineWidget<RectOptions, Rect>(Rect)
