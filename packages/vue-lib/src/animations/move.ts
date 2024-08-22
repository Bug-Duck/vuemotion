import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { BaseWidgetOptions } from "../widgets/base-widget";

export function move(options: BaseAnimation & {
  offsetX: number
}) {
  return defineAnimation<BaseWidgetOptions>({
    init(context) {
      // console.log(context)
    },
    update(context) {
      context.props.x = options.offsetX * this.progress
      console.log(context.props.x)
    },
    finish(context) {
      // console.log(context)
    },
    duration: options.duration,
    by: options.by
  })
}