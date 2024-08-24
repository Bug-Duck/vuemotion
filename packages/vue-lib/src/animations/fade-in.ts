import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core"
import { BaseWidgetOptions } from "../widgets/base-widget"

export function fadeIn(options: BaseAnimation) {
  return defineAnimation<BaseWidgetOptions>({
    init(context) {
        
    },
    update(context) {
      context.props.opacity = this.by(this.progress)
    },
    finish(context) {
        
    },
    duration: options.duration,
    by: options.by ?? (x => x)
  })
}