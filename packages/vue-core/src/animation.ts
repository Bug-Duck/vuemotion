import { Ref, VNodeRef } from "vue"

export interface AnimationContext<T> {
  props: T
}

export interface Animation<T> {
  init(context: AnimationContext<T>): void
  update(context: AnimationContext<T>) : void
  finish(context: AnimationContext<T>) : void
  duration: number
  by?: number
}