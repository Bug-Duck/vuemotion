import { defineAnimation } from "@vue-motion/core";
import type { Positional } from "./move";

export const moveOnPath = defineAnimation<
  Positional,
  {
    path: string;
  }
>((target, context) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", context.path);
  return (progress) => {
    const length = path.getTotalLength();
    const point = path.getPointAtLength(progress * length);
    target.x = point.x;
    target.y = point.y;
  };
});

export const moveOnFunction = defineAnimation<
  Positional,
  {
    path: (progress: number) => {
      x: number;
      y: number;
    };
    divisionX?: number;
    divisionY?: number;
  }
>((target, context) => {
  const divisionX = context.divisionX ?? 1;
  const divisionY = context.divisionY ?? 1;

  return (progress) => {
    const point = context.path(progress);
    const newX = point.x * divisionX;
    const newY = point.y * divisionY;

    if (!Number.isNaN(newX)) {
      target.x = newX;
    }
    if (!Number.isNaN(newY)) {
      target.y = newY;
    }
  };
});
