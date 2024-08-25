import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { BaseWidgetOptions } from "../widgets/base-widget";
import { easeBounce } from "../timing-functions";

export function wiggle(options: BaseAnimation = { duration: 1 }) {
  return defineAnimation<BaseWidgetOptions>({
    init() {},
    update(context) {
      const intensity = 5; // 控制发抖的强度

      if (this.progress >= 0 && this.progress <= 0.3) {
        context.props.scaleX = 1 + 0.3 * (this.by(this.progress) / 0.3);
        context.props.scaleY = 1 + 0.3 * (this.by(this.progress) / 0.3);
      }
      if (this.progress >= 0.3 && this.progress <= 0.7) {
        context.props.rotation = intensity * Math.sin((this.progress - 0.3) * 50 * Math.PI);
      }
      if (this.progress >= 0.7 && this.progress <= 1) {
        context.props.scaleX = 1 + 0.3 * (this.by(1 - this.progress) / 0.3);
        context.props.scaleY = 1 + 0.3 * (this.by(1 - this.progress) / 0.3);
      }
    },
    finish(context) {
      context.props.scaleX = 1;
      context.props.scaleY = 1;
      context.props.rotation = 0; // 恢复初始状态
    },
    duration: options.duration,
    by: options.by ?? easeBounce,
  });
}
