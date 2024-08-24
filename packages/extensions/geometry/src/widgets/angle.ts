import { FigureOptions } from '@vuemotion/vue-lib'

export interface AngleOptions extends FigureOptions {
  mode?: 'radian' | 'degree'
  value: number
  arc?: string
  arcRadius?: number
  from?: number
  fromSide?: number
  endSide?: number
  order?: 'positive' | 'negative'
}