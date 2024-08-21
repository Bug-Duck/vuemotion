import { BaseAnimation, defineAnimation } from "../animation";

export function strokeFill(options: BaseAnimation & {
  origin?: number
}) {
  return defineAnimation(async context => {
    await Promise.all([
      new Promise(resolve => {
        const graph = context.tag.querySelector('#graph')
        graph.setAttribute("stroke-dasharray", '100')
        graph.animate([
          { strokeDasharray: `0 ${options.origin ?? 500}` },
          { strokeDasharray: `${options.origin ?? 500} 0` }
        ], {
          duration: options.duration * 1000,
          fill: 'forwards',
        }).addEventListener('finish', () => resolve(null))
      }),
      new Promise(resolve => {
        const graph = context.tag.querySelector('#graph')
        const color = graph.getAttribute('fill')
        graph.animate([
          { fill: 'rgba(0, 0, 0, 0)' },
          { fill: color }
        ], {
          duration: options.duration * 1000,
          fill: 'forwards',
        }).addEventListener('finish', () => resolve(null))
      })
    ])
  })
}