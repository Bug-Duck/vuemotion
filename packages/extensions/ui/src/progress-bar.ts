import type { Figure, Grownable } from '@vuemotion/lib'
import type { ExtractPropTypes } from 'vue'

export interface ProgressBarOptions extends ExtractPropTypes<typeof Figure>, Grownable {
  width: number
  value: number
  progressColor: string
}
