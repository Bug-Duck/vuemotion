import { defineAnimation } from "@vuemotion/core";

export const focusOn = defineAnimation<object, {}>((context, progress) => {
  if (progress === 0) {
    context.element.value.appendChild(circle)
    console.log(context.element.value);
    circle.setAttribute('cx', context.props.x.toString())
    circle.setAttribute('cy', context.props.y.toString())
    circle.setAttribute('fill', 'rgba(255,255,255,0.5)')
  }
})