import { BaseWidget } from "@suaterjs/core";
import { defineAnimation } from "../../../core/src/animation";

export function delay(delay: number) {
  return defineAnimation<BaseWidget>(context => {
    const animateTag = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    animateTag.setAttribute('dur', `${delay}s`)
    return {
      tags: animateTag,
      target: context.root
    }
  })
}