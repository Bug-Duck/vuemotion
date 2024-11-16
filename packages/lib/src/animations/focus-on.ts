import type { Widget } from '@vue-motion/core'
import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'
import type { Positional } from './move'

export const focusOn = defineAnimation<{
  offset?: number
  circle?: SVGCircleElement
}, Widget & Positional>((context, progress) => {
  if (progress === 0) {
    context.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    target.element?.appendChild(context.circle)

    context.circle.setAttribute('cx', target.x!.toString())
    context.circle.setAttribute('cy', target.y!.toString())
    context.circle.setAttribute('fill', 'rgba(255,255,255,0.5)')
  }
  context.circle!.setAttribute('r', interpolator(context.offset ?? 1000, 0, progress).toString())
})
