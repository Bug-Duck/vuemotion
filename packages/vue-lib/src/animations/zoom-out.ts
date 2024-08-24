import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core"
import { BaseWidgetOptions } from "../widgets/base-widget"

export function zoomIn(options: BaseAnimation) {
  return defineAnimation<BaseWidgetOptions>({
    init(context) {
        
    },
    update(context) {
      context.props.scaleX = this.by(1 - this.progress)
      context.props.scaleY = this.by(1 - this.progress)
    },
    finish(context) {
        
    },
    duration: options.duration,
    by: options.by ?? (x => x)
  })
}