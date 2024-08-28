import { defineAnimation } from "@vue-motion/core";
import { Scalable } from "./scale";
import { interpolator } from "../interpolator";

export const indicate = defineAnimation<object, Scalable>((context, progress) => {
  if (progress >= 0 && progress <= 0.3) {
    context.target.scaleX = interpolator(1, 1.3, progress / 0.3)
    context.target.scaleY = interpolator(1, 1.3, progress / 0.3)
  }
  if (progress >= 0.7 && progress <= 1) {
    context.target.scaleX = interpolator(1.3, 1, (progress - 0.7) / 0.3)
    context.target.scaleY = interpolator(1.3, 1, (progress - 0.7) / 0.3)
  }
})