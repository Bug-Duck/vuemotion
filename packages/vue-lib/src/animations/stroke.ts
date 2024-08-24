import { BaseAnimation, defineAnimation } from "@vuemotion/vue-core"
import { FigureOptions } from "../widgets/figure"

export function stroke(options: BaseAnimation & {
  origin?: number
} = { duration: 1 }) {
  return defineAnimation<FigureOptions>({
    init() {},
    update(context) {
      context.props.interval = [(options.origin ?? 500) * (options.by ?? ((x: number) => x))(this.progress), (options.origin ?? 500) * (1 - (options.by ?? ((x: number) => x))(this.progress))]
    },
    finish(){},
    duration: options.duration,
    by: options.by
  })
}