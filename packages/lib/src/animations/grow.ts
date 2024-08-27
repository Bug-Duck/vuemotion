import { defineAnimation } from '@vuemotion/core'
import type { Grownable } from '../widgets/typings'

export const create = defineAnimation<object, Grownable>(
  (context, progress) => {
    context.widget.progress = progress
  },
)

export const destory = defineAnimation<object, Grownable>(
  (context, progress) => {
    context.widget.progress = 1 - progress
  },
)
