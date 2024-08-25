import { FigureOptions } from "./figure";

type UnitsOptionsType = "userSpaceOnUse" | "objectBoundingBox"

export interface PolylineOptions extends FigureOptions {
    points?: string
    pathLength?: number
}