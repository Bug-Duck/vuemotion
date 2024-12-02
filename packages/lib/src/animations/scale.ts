import type { AnimationParams } from "@vue-motion/core";
import { defineAnimation } from "@vue-motion/core";
import { interpolator } from "../interpolator";

export interface Scalable {
  scaleX?: number;
  scaleY?: number;
}

export interface ScalableIns extends Scalable {
  scale: (offsetX: number, offsetY: number, options?: AnimationParams) => void;
  scaleTo: (toX: number, toY: number, options?: AnimationParams) => void;
}

export const scale = defineAnimation<
  Scalable,
  {
    fromX?: number;
    fromY?: number;
    offsetX?: number;
    offsetY?: number;
  }
>((target, context) => (progress) => {
  if (progress === 0) {
    context.fromX ??= target.scaleX ?? 1;
    context.fromY ??= target.scaleY ?? 1;
    context.offsetX ??= 0;
    context.offsetX ??= 0;
  }
  target.scaleX = context.fromX! * interpolator(1, context.offsetX!, progress);
  target.scaleY = context.fromY! * interpolator(1, context.offsetY!, progress);
});

export const scaleTo = defineAnimation<
  Scalable,
  {
    fromX?: number;
    fromY?: number;
    toX?: number;
    toY?: number;
  }
>((target, context) => (progress) => {
  target.scaleX = interpolator(context.fromX!, context.toX!, progress);
  target.scaleY = interpolator(context.fromY!, context.toY!, progress);
});
