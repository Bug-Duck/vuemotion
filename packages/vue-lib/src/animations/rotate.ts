import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { BaseWidgetOptions } from "../widgets/base-widget";

export function rotate(options: BaseAnimation & {
  offset: number
}) {
  return defineAnimation<BaseWidgetOptions>({
    init(context) {
      // console.log(context)
    },
    update(context) {
      context.props.rotation = options.offset * this.progress
    },
    finish(context) {
      // console.log(context)
    },
    duration: options.duration,
    by: options.by
  })
}