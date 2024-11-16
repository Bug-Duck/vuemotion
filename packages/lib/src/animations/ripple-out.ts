import type { Widget } from '@vue-motion/core'
import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'
import type { Positional } from './move'

export const rippleOut = defineAnimation<{
  offset?: number
}, Widget & Positional>((context, progress) => {
  let circle
  if (progress === 0) {
    circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    target.element?.appendChild(circle)

    circle.setAttribute('cx', target.x!.toString())
    circle.setAttribute('cy', target.y!.toString())
    circle.setAttribute('fill', 'rgba(255,255,255,0.5)')
  }
  circle!.setAttribute('r', interpolator(0, context.offset ?? 1000, progress).toString())
})
