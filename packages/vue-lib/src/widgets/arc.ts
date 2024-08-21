import { FigureOptions } from "./figure"

export interface ArcOptions extends FigureOptions {
  radius: number;
  from?: number;
  to?: number;
}
