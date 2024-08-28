import { Widget } from "@vuemotion/core";
import { defineAnimation } from "@vuemotion/core";
import { Positional } from "./move";
import { interpolator } from "../interpolator";

export const focusOn = defineAnimation<{
  offset?: number
}, Widget & Positional>((context, progress) => {
  let circle
  if (progress === 0) {
    circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    context.target.element?.appendChild(circle)
    console.log(context.target.element)
    circle.setAttribute('cx', context.target.x!.toString())
    circle.setAttribute('cy', context.target.y!.toString())
    circle.setAttribute('fill', 'rgba(255,255,255,0.5)')
  }
  circle!.setAttribute('r', interpolator(context.offset ?? 1000, 0, progress).toString())
})