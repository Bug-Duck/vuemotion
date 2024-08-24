import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core";
import { BaseWidgetOptions } from "../widgets/base-widget";

export function destroy(options: BaseAnimation = { duration: 1 }) {
  return defineAnimation<BaseWidgetOptions>({
    init() {},
    update(context) {
      const adjustPorcess = (options.by ?? ((x: number) => x))(1 - this.progress)
      context.props.progress = adjustPorcess
    },
    finish() {},
    duration: options.duration,
    by: options.by,
  })
}