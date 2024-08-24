import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core"
import { BaseWidgetOptions } from "../widgets/base-widget"

export function fadeOut(options: BaseAnimation = { duration: 1 }) {
  return defineAnimation<BaseWidgetOptions>({
    init(context) {
        
    },
    update(context) {
      context.props.opacity = this.by(1 - this.progress)
    },
    finish(context) {
        
    },
    duration: options.duration,
    by: options.by ?? (x => x)
  })
}