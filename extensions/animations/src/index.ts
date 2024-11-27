import type { AnimationParams } from '@vue-motion/core'
import { registerAnimation } from '@vue-motion/core'
import type { Positional } from '@vue-motion/lib'
import { focusOn } from './focus'

export const setups = [
  () => {
    registerAnimation<Positional>('focusOn', (params: AnimationParams) => (manager) => manager.animate(focusOn, {
      duration: params?.duration ?? 1,
      by: params?.by,
    }))
  },
]

declare module '@vue-motion/lib' {
  export interface PositionalMixin {
    focusOn: (params?: any) => void
  }
}

export { focusOn }
