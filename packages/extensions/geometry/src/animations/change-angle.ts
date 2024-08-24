import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { AngleOptions } from "../widgets/angle";

export function changeAngle(options: BaseAnimation & {
  offset: number
}) {
  let origin: number
  return defineAnimation<AngleOptions>({
    init(context) {
      origin = context.props.value
    },
    update(context) {
      context.props.value = origin + options.offset * this.progress
    },
    finish(context) {
        
    },
    duration: options.duration
  })
}