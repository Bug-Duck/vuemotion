import { Reactive, Ref, VNodeRef } from "vue"

export interface AnimationContext<T> {
  props: Reactive<T>
  element: Ref<SVGElement>
  range: Reactive<{
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    width: number
    height: number
  }>
}

export interface Animation<T> {
  init(context: AnimationContext<T>): void

  update(context: AnimationContext<T>): void

  finish(context: AnimationContext<T>): void

  duration: number
  by?: (progress: number) => number
  progress?: number
  begin?: number
}

export function defineAnimation<T>(animation: Animation<T>) {
  return animation
}

export interface BaseAnimation {
  duration: number
  by?: (progress: number) => number
}