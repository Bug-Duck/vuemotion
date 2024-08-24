import { FigureOptions } from "./figure";

export interface TextOptions extends FigureOptions {
  fontSize?: number
  fontFamily?: string
  fontWeight?: number
  fontDecoration?: string
  wordSpacing?: number
  letterSpacing?: number
  align?: "start" | "middle" | "end"
  baseline?: "top" | "middle" | "bottom"
}