import { defineAnimation } from '@vue-motion/core'
import type { Positional } from './move'

export const moveOnPath = defineAnimation<Positional, {
  path: string
}>((target, context) => {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', context.path)
  return (progress) => {
    const length = path.getTotalLength()
    const point = path.getPointAtLength(progress * length)
    target.x = point.x
    target.y = point.y
  }
})

export const moveOnFunction = defineAnimation<Positional, {
  path: (progress: number) => {
    x: number
    y: number
  }
}>((target, context) => {
  return (progress) => {
    const point = context.path(progress)
    target.x = point.x
    target.y = point.y
  }
})
