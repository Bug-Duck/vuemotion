import { BaseWidgetOptions } from '@vuemotion/vue-lib'

export interface MathFunctionOptions extends BaseWidgetOptions {
  fn: (x: number) => number
  domain: [number, number]
  range?: [number, number]
  divisionX?: number
  divisionY?: number
  color?: string
  width?: number
}