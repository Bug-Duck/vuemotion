import { FigureOptions } from "@vuemotion/vue-lib";

export interface ProgressBarOptions extends FigureOptions {
  width: number
  value: number
  progressColor: string
}
