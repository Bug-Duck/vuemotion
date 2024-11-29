import { defineAnimation } from "@vue-motion/core";
import type { Widget } from "@vue-motion/core";
import type { Positional } from "@vue-motion/lib";

export const focusOn = defineAnimation<
  Positional & Widget,
  {
    scale?: number;
    offsetFrom?: [number, number];
  }
>((target, context) => {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  const { width, height } = target.range!;
  circle.setAttribute("cx", width.toString());
  circle.setAttribute("cy", height.toString());
  circle.setAttribute("fill", "rgba(135,206,250,0.3)");
  circle.setAttribute("stroke", "rgba(135,206,250,0.3)");
  const originRadius = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
  const scaledRadius = originRadius * (context.scale ?? 2);
  circle.setAttribute("r", scaledRadius.toString());
  target.element?.appendChild(circle);
  return (progress) => {
    circle.setAttribute("r", (scaledRadius * (1 - progress)).toString());
  };
});

export const focusOut = defineAnimation<
  Positional & Widget,
  {
    scale?: number;
    offsetFrom?: [number, number];
  }
>((target, context) => {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  const { width, height } = target.range!;
  circle.setAttribute("cx", width.toString());
  circle.setAttribute("cy", height.toString());
  circle.setAttribute("fill", "rgba(135,206,250,0.3)");
  circle.setAttribute("stroke", "rgba(135,206,250,0.3)");
  const originRadius = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
  const scaledRadius = originRadius * (context.scale ?? 2);
  circle.setAttribute("r", scaledRadius.toString());
  target.element?.appendChild(circle);
  return (progress) => {
    circle.setAttribute("r", (scaledRadius * progress).toString());
  };
});
