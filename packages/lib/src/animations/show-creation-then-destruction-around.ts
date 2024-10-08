import type { Widget } from '@vue-motion/core'
import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'
import type { Positional } from './move'

export const showCreationThenDestructionAround = defineAnimation<{
  rect?: SVGRectElement
  color?: string
}, Widget & Positional>((context, progress) => {
  if (progress === 0) {
    context.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    context.rect.setAttribute('fill', 'none')
    context.rect.setAttribute('stroke', context.color || 'yellow')
    context.rect.setAttribute('stroke-width', '3')
    context.rect.setAttribute('width', context.target.range!.width.toString()!)
    context.rect.setAttribute('height', context.target.range!.height.toString())
    context.rect.setAttribute('stroke-dasharray', `0,${context.target.range!.width! * 2 + context.target.range!.height! * 2}`)
    context.rect.setAttribute('x', ((context.target.x ?? 0) - context.target.range!.width / 2).toString()!)
    context.rect.setAttribute('y', ((context.target.y ?? 0) - context.target.range!.height / 2).toString()!)
    context.target.element?.appendChild(context.rect)
  }
  if (progress >= 0 && progress < 0.5) {
    context.rect?.setAttribute('stroke-dasharray', `${interpolator(0, context.target.range!.width! * 2 + context.target.range!.height! * 2, progress * 2)},${interpolator(context.target.range!.width! * 2 + context.target.range!.height! * 2, 0, progress * 2)}`)
  }
  else if (progress >= 0.5 && progress < 1) {
    context.rect?.setAttribute('stroke-dasharray', `${interpolator(0, context.target.range!.width! * 2 + context.target.range!.height! * 2, 1 - (progress - 0.5) * 2)},${interpolator(context.target.range!.width! * 2 + context.target.range!.height! * 2, 0, 1 - (progress - 0.5) * 2)}`)
  }
  if (progress === 1)
    context.rect?.remove()
})
