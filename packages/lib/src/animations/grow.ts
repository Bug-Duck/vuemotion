import { defineAnimation } from '@vue-motion/core'

export interface Grownable {
  progress?: number
}

export const create = defineAnimation<object, Grownable>(
  (context, progress) => {
    context.target.progress = progress
  },
)

export const destory = defineAnimation<object, Grownable>(
  (context, progress) => {
    context.target.progress = 1 - progress
  },
)
