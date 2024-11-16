import { defineAnimation } from '@vue-motion/core'
import type { Rotatable } from './rotate'

export const wiggle = defineAnimation<{
  amplitude?: number
}, Rotatable>((context, progress) => {
  const amplitude = context.amplitude

  // Wiggle effect using a sine function for smooth oscillation
  const angle = Math.sin(progress * Math.PI * 8) * (amplitude ?? 5)

  target.rotation = angle
})
