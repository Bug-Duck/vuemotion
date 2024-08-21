import { FigureOptions } from "./figure";

export interface LineOptions extends FigureOptions {
  width?: number
  from: [number, number]
  to: [number, number]
}