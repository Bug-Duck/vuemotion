import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { BaseWidgetOptions } from "../widgets/base-widget";

export function scale(options: BaseAnimation & {
  offsetX: number
  offsetY: number
}) {
  return defineAnimation<BaseWidgetOptions>({
    init(context) {
      // console.log(context)
    },
    update(context) {
      context.props.scaleX = options.offsetX * this.progress
      context.props.scaleY = options.offsetY * this.progress
    },
    finish(context) {
      // console.log(context)
    },
    duration: options.duration,
    by: options.by
  })
}