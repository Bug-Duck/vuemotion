import type { AnimationParams } from "@vue-motion/core";
import { defineAnimation } from "@vue-motion/core";
import { interpolator } from "../interpolator";
import type { HasOpacity } from "./fade";

export interface Strokable {
  borderInterval: number[];
}
export interface StrokableIns extends Strokable {
  trace: (origin: number, options?: AnimationParams) => void;
  traceFill: (origin: number, options?: AnimationParams) => void;
}

export const trace = defineAnimation<
  Strokable,
  {
    origin?: number;
  }
>((target, context) => (progress) => {
  target.borderInterval = [
    interpolator(0, context.origin ?? 500, progress),
    interpolator(context.origin ?? 500, 0, progress),
  ] as number[];
});

export const traceFill = defineAnimation<
  Strokable & HasOpacity,
  {
    origin?: number;
  }
>((target, context) => (progress) => {
  target.borderInterval = [
    interpolator(0, context.origin ?? 500, progress),
    interpolator(context.origin ?? 500, 0, progress),
  ] as number[];
  target.opacity = interpolator(0, 1, progress);
});
