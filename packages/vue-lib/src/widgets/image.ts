import { FigureOptions } from "./figure.ts";

export interface ImageOptions extends FigureOptions{
  x?: number
  y?: number
  height: number
  width: number
  href?: string
  preserveAspectRatio?: "none" | "xMinYMin" | "xMidYMin" | "xMaxYMin" | "xMinYMid" | "xMidYMid" | "xMaxYMid" | "xMinYMax" | "xMidYMax" | "xMaxYMax"
  crossorigin?: string | "anonymous" | "use-credentials"
  decoding?: "sync" | "async" | "auto"
}