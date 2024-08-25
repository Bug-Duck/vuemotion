import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { BaseWidgetOptions } from "../widgets/base-widget";

export function flash(options: BaseAnimation) {
  const lines: Array<SVGLineElement> = []
  for (let i = 0; i <= 16; i++) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    lines.push(line)
  }
  return defineAnimation<BaseWidgetOptions>({
    init(context) {
      const radius = Math.max(context.range.width / 2, context.range.height / 2)
      console.log(radius)
      lines.forEach((line, i) => {
        line.setAttribute('x1', radius.toString())
        line.setAttribute('y1', radius.toString())
        line.setAttribute('x2', (radius + 10).toString())
        line.setAttribute('y2', (radius + 10).toString())
        line.setAttribute('transform', `rotate(${i * 22.5}) translate(${context.props.x ?? 0}, ${context.props.y ?? 0})`)
        line.setAttribute('stroke', 'white')
      })
      context.element.value.append(...lines)
    },
    update(context) {
      if (this.progress >= 0 && this.progress < 0.5) {
        lines.forEach(line => {
          line.setAttribute('x2', (this.progress * 2 * 10).toString())
          line.setAttribute('y2', (this.progress * 2 * 10).toString())
        })
      } else {
        lines.forEach(line => {
          line.setAttribute('x2', ((1 - this.progress) * 2 * 10).toString())
          line.setAttribute('y2', ((1 - this.progress) * 2 * 10).toString())
        })
      }
    },
    finish(context) {
        
    },
    duration: options.duration ?? 1
  })
}