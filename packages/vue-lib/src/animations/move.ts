import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { BaseWidgetOptions } from "../widgets/base-widget";

export function move(options: BaseAnimation & {
  offsetX: number
  offsetY: number
}) {
  return defineAnimation<BaseWidgetOptions>({
    init(context) {
      // console.log(context)
    },
    update(context) {
      context.props.x = options.offsetX * this.progress
      context.props.y = options.offsetY * this.progress
    },
    finish(context) {
      // console.log(context)
    },
    duration: options.duration,
    by: options.by
  })
}