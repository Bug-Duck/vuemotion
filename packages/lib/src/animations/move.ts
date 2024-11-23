import type { AnimationParams } from '@vue-motion/core'
import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'

export interface Positional {
  x?: number
  y?: number
}

export interface PositionalMixin extends Positional {
  move: (offsetX: number, offsetY: number, options?: AnimationParams) => void
  moveTo: (toX: number, toY: number, options?: AnimationParams) => void
  moveOnPath: (path: string, options?: AnimationParams) => void
  moveOnFunction: (path: (progress: number) => { x: number, y: number }, options?: AnimationParams) => void
}

export const move = defineAnimation<Positional, {
  fromX?: number
  fromY?: number
  offsetX?: number
  offsetY?: number
}>((target, context) => {
  context.fromX ??= target.x ?? 0
  context.fromY ??= target.y ?? 0
  context.offsetX ??= 0
  context.offsetX ??= 0
  return (progress) => {
    target.x = context.fromX! + interpolator(0, context.offsetX!, progress)
    target.y = context.fromY! + interpolator(0, context.offsetY!, progress)
  }
})

export const moveTo = defineAnimation<Positional, {
  fromX?: number
  fromY?: number
  toX?: number
  toY?: number
}>((target, context) => (progress) => {
  target.x = interpolator(context.fromX!, context.toX!, progress)
  target.y = interpolator(context.fromY!, context.toY!, progress)
})
