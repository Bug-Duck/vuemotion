import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";

export function stroke(options: BaseAnimation & {
  origin?: number
}) {
  // return defineAnimation<Figure>(context => {
  //   const graph = context.root.querySelector('#graph')
  //   const strokeTag = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
  //   strokeTag.setAttribute('attributeName', 'stroke-dasharray')
  //   strokeTag.setAttribute('from', `0 ${options.origin ?? 500}`)
  //   strokeTag.setAttribute('to', `${options.origin ?? 500} 0`)
  //
  //   return {
  //     tags: strokeTag,
  //     target: graph as SVGElement,
  //   }
  // })

  return defineAnimation({
    init(context) {
      // console.log(context)
    },
    update(context) {
      // console.log(context)
    },
    finish(context) {
      // console.log(context)
    },
    duration: 1000,
  })
}