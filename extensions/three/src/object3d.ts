import type { Widget3DOptions } from "./widget3d.ts";

export interface Object3DOptions extends Widget3DOptions {
  fillColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderOffset?: number;
  borderInterval?: number[];
}
