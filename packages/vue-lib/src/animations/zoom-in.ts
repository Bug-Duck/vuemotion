import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core"
import { BaseWidgetOptions } from "../widgets/base-widget"

export function zoomIn(options: BaseAnimation = { duration: 1 }) {
  return defineAnimation<BaseWidgetOptions>({
    init(context) {
        
    },
    update(context) {
      context.props.scaleX = this.by(this.progress)
      context.props.scaleY = this.by(this.progress)
    },
    finish(context) {
        
    },
    duration: options.duration,
    by: options.by ?? (x => x)
  })
}