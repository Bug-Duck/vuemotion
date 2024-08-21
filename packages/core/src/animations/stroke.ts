import { BaseAnimation, defineAnimation } from "../animation";
import { Figure } from "../widgets/figure";

export function stroke(options: BaseAnimation & {
  origin?: number
}) {
  return defineAnimation<Figure>(async context => {
    await new Promise(resolve => {
      const graph = context.tag.querySelector('#graph')
      graph.setAttribute("stroke-dasharray", '100')
      graph.animate([
        { strokeDasharray: `0 ${options.origin ?? 500}` },
        { strokeDasharray: `${options.origin ?? 500} 0` }
      ], {
        duration: options.duration * 1000,
        fill: 'forwards',
      }).addEventListener('finish', () => resolve(null))
    })
  })
}