import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { easeBounce, easeInExpo } from "../timing-functions";
import { BaseWidgetOptions } from "../widgets/base-widget";

export function circleIndicate(options: BaseAnimation & {
  color?: string
  offset?: number
} = { duration: 1, color: 'yellow' }) {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  circle.setAttribute('fill', 'none')
  circle.setAttribute('stroke', options.color || 'yellow')
  circle.setAttribute('stroke-width', '5')
  return defineAnimation<BaseWidgetOptions>({
    init(context) {
      circle.setAttribute('cx', context.props.x.toString())
      circle.setAttribute('cy', context.props.y.toString())
      const bounds = context.element.value.getBoundingClientRect()
      circle.setAttribute("r", Math.max(bounds.width / 2, bounds.height / 2).toString())
      context.element.value.appendChild(circle)
    },
    update(context) {
      if (this.progress >= 0 && this.progress <= 0.3) {
        circle.style.opacity = (0.3 * (this.by(this.progress) / 0.3)).toString()
        circle.setAttribute('transform', `scale(${1 + options.offset * this.by(1 - this.progress)})`)
      }
      if (this.progress >= 0.7 && this.progress <= 1) {
        circle.style.opacity = (0.3 * (this.by(1 - this.progress) / 0.3)).toString()
        circle.setAttribute('transform', `scale(${1 + options.offset * this.by(this.progress)})`)
      }
    },
    finish(context) {

    },
    duration: options.duration,
    by: options.by ?? (x => x)
  })
}