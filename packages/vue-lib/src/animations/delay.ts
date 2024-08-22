import { BaseWidgetOptions } from "../widgets/base-widget";
import { defineAnimation } from "@vuemotion/vue-core"

export function delay(delay: number) {
  return defineAnimation<BaseWidgetOptions>({
    init() {},
    update() {},
    finish() {},
    duration: delay,
  })
}