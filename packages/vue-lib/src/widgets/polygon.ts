import { FigureOptions } from "./figure";

export interface PolygonOptions extends FigureOptions {
  points: Array<[number, number]>
}
