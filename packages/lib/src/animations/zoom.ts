import type { AnimationParams } from "@vue-motion/core";
import { defineAnimation } from "@vue-motion/core";
import { interpolator } from "../interpolator";

export interface HasScale {
  scaleX?: number;
  scaleY?: number;
}
export interface HasScaleIns extends HasScale {
  zoomTo: (toX: number, toY: number, options?: AnimationParams) => void;
  zoomIn: (options?: AnimationParams) => void;
  zoomOut: (options?: AnimationParams) => void;
}

export const zoomTo = defineAnimation<
  HasScale,
  {
    fromX?: number;
    toX?: number;
    fromY?: number;
    toY?: number;
  }
>((target, context) => (progress) => {
  if (progress === 0) {
    context.fromX ??= target.scaleX ?? 1;
    context.toX ??= target.scaleX ?? 1;
    context.fromY ??= target.scaleY ?? 1;
    context.toY ??= target.scaleY ?? 1;
  }
  target.scaleX = interpolator(context.fromX!, context.toX!, progress);
  target.scaleY = interpolator(context.fromY!, context.toY!, progress);
});

export const zoomOut = defineAnimation<
  HasScale,
  {
    fromX?: number;
    fromY?: number;
  }
>((target, context) => (progress) => {
  target.scaleX = interpolator(context.fromX ?? 1, 0, progress);
  target.scaleY = interpolator(context.fromY ?? 1, 0, progress);
});

export const zoomIn = defineAnimation<
  HasScale,
  {
    toX?: number;
    toY?: number;
  }
>((target, context) => (progress) => {
  target.scaleX = interpolator(0, context.toX ?? 1, progress);
  target.scaleY = interpolator(0, context.toY ?? 1, progress);
});
