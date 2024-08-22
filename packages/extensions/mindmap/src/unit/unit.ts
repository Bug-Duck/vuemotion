import { BaseWidgetOptions } from "@vuemotion/vue-lib"

export interface UnitOptions extends BaseWidgetOptions {
  shape?: 'rect' | 'round' | 'none'
}