import { BaseAnimation, defineAnimation } from "@vuemotion/core";
import { Figure } from "../widgets/figure";

export function strokeFill(options: BaseAnimation & {
  origin?: number
}) {
  return defineAnimation<Figure>(context => {
    const graph = context.root.querySelector('#graph')
    const strokeTag = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    strokeTag.setAttribute('attributeName', 'stroke-dasharray')
    strokeTag.setAttribute('from', `0 ${options.origin ?? 500}`)
    strokeTag.setAttribute('to', `${options.origin ?? 500} 0`)

    const fillTag = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    fillTag.setAttribute('attributeName', 'fill')
    fillTag.setAttribute('from', 'rgba(0,0,0,0)')
    fillTag.setAttribute('to', graph.getAttribute('fill'))

    return {
      tags: [strokeTag, fillTag],
      target: graph as SVGElement,
    }
  })
}