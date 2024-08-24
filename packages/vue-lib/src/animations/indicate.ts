import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { BaseWidgetOptions } from "../../dist";
import { easeBounce, easeInExpo } from "../timing-functions";

export function indicate(options: BaseAnimation = { duration: 1 }) {
  return defineAnimation<BaseWidgetOptions>({
    init() {},
    update(context) {
      if (this.progress >= 0 && this.progress <= 0.3) {
        context.props.scaleX = 1 + 0.3 * (this.by(this.progress) / 0.3)
        context.props.scaleY = 1 + 0.3 * (this.by(this.progress) / 0.3)
      }
      if (this.progress >= 0.7 && this.progress <= 1) {
        context.props.scaleX = 1 + 0.3 * (this.by(1 - this.progress) / 0.3)
        context.props.scaleY = 1 + 0.3 * (this.by(1 - this.progress) / 0.3)
      }
    },
    finish(context) {},
    duration: options.duration,
    by: options.by ?? easeBounce,
  })
}