import type { Grownable, Widget } from '@vuemotion/lib'
import type { ExtractPropTypes } from 'vue'

export interface WindowOptions extends ExtractPropTypes<typeof Widget>, Grownable {
  width: number
  height: number
  title: string
  theme?: 'light' | 'dark'
}
