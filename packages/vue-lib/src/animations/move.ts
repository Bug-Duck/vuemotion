import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";

export function move(options: BaseAnimation & {
  offsetX: number
}) {
  return defineAnimation({
    init(context) {
      // console.log(context)
    },
    update(context) {
      context.props.x = options.offsetX * this.progress
    },
    finish(context) {
      // console.log(context)
    },
    duration: options.duration,
    by: options.by
  })
}