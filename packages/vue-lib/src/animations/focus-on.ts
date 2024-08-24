import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { BaseWidgetOptions } from "../widgets/base-widget";

export function focusOn(options: BaseAnimation = { duration: 1 }) {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  circle.setAttribute('r', '1000')
  circle.setAttribute('fill', 'skyblue')
  return defineAnimation<BaseWidgetOptions>({
    init(context) {
      context.element.value.appendChild(circle)
      console.log(context.element.value);
      circle.setAttribute('cx', context.props.x.toString())
      circle.setAttribute('cy', context.props.y.toString())
      circle.setAttribute('fill', 'rgba(255,255,255,0.5)')
    },
    update(context) {
      circle.setAttribute('r', ((options.by ?? ((x: number) => x))(1 - this.progress) * 1000).toString())
    },
    finish() { },
    duration: options.duration ?? 0.3,
    by: options.by
  })
}