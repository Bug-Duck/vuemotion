import type { Widget } from '@vuemotion/lib'

export interface Unit extends Widget {
  shape?: 'rect' | 'round' | 'none'
}
