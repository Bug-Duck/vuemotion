import { FigureOptions } from "./figure"

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
