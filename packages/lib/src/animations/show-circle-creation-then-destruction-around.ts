import type { Widget } from '@vue-motion/core'
import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'
import type { Positional } from './move'

export const showCircleCreationThenDestructionAround = defineAnimation<{
  circle?: SVGCircleElement
  color?: string
}, Widget & Positional>((context, progress) => {
  if (progress === 0) {
    context.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    context.circle.setAttribute('fill', 'none')
    context.circle.setAttribute('stroke', context.color || 'yellow')
    context.circle.setAttribute('stroke-width', '3')
    context.circle.setAttribute('r', Math.max(target.range!.width / 2, target.range!.height / 2).toString())
    context.circle.setAttribute('stroke-dasharray', `0,${Number(target.element?.getAttribute('r')) * 2 * Math.PI}`)
    context.circle.setAttribute('cx', target.x?.toString() ?? '0')
    context.circle.setAttribute('cy', target.y?.toString() ?? '0')
    target.element?.appendChild(context.circle)
  }
  if (progress >= 0 && progress < 0.5) {
    context.circle?.setAttribute('stroke-dasharray', `${interpolator(0, Number(context.circle.getAttribute('r')) * 2 * Math.PI, progress * 2)},${interpolator(Number(context.circle.getAttribute('r')) * 2 * Math.PI, 0, progress * 2)}`)
  }
  else if (progress >= 0.5 && progress < 1) {
    context.circle?.setAttribute('stroke-dasharray', `${interpolator(0, Number(context.circle.getAttribute('r')) * 2 * Math.PI, 1 - (progress - 0.5) * 2)},${interpolator(Number(context.circle.getAttribute('r')) * 2 * Math.PI, 0, 1 - (progress - 0.5) * 2)}`)
  }
  if (progress === 1)
    context.circle?.remove()
})
