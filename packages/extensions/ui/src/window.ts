import { BaseWidgetOptions } from "@vuemotion/vue-lib"

export interface WindowOptions extends BaseWidgetOptions {
  width: number
  height: number
  title: string
  theme?: 'light' | 'dark'
}