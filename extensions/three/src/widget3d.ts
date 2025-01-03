import type { WidgetOptions } from "@vue-motion/lib";

export interface Widget3DOptions extends WidgetOptions {
  x?: number;
  y?: number;
  z?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
}
