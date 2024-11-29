import type { AnimationParams } from "@vue-motion/core";
import { defineAnimation } from "@vue-motion/core";
import { interpolator } from "../interpolator";

export interface HasOpacity {
  opacity?: number;
}
export interface HasOpacityMixin extends HasOpacity {
  fadeTo: (to: number, params?: AnimationParams) => void;
  fadeIn: (params?: AnimationParams) => void;
  fadeOut: (params?: AnimationParams) => void;
}

export const fadeTo = defineAnimation<
  HasOpacity,
  {
    from?: number;
    to?: number;
  }
>((target, context) => {
  context.from ??= target.opacity ?? 1;
  context.to ??= target.opacity ?? 1;
  return (progress) => {
    target.opacity = interpolator(context.from!, context.to!, progress);
  };
});

export const fadeOut = defineAnimation<
  HasOpacity,
  {
    to?: number;
  }
>((target, { to }) => (progress) => {
  target.opacity = interpolator(1, to ?? 0, progress);
});

export const fadeIn = defineAnimation<
  HasOpacity,
  {
    from?: number;
  }
>((target, { from }) => (progress) => {
  target.opacity = interpolator(from ?? 0, 1, progress);
});
