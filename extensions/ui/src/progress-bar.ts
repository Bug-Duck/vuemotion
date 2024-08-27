import type { FigureOptions, Grownable } from '@vuemotion/lib'

export interface ProgressBarOptions extends FigureOptions, Grownable {
  width: number
  value: number
  progressColor: string
}
