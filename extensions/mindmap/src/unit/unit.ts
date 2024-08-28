import type { Widget } from '@vue-motion/lib'

export interface Unit extends Widget {
  shape?: 'rect' | 'round' | 'none'
}
