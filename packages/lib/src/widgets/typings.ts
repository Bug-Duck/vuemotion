import type { BaseWidget } from '@vuemotion/core'

export type Point = [number, number]
export interface Grownable extends BaseWidget {
  progress?: number
}
