import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { BaseWidgetOptions } from "../../dist";

export function create(options: BaseAnimation) {
  return defineAnimation<BaseWidgetOptions>({
    init() {},
    update(context) {
      const adjustPorcess = (options.by ?? ((x: number) => x))(this.progress)
      context.props.progress = adjustPorcess
    },
    finish() {},
    duration: options.duration,
  })
}