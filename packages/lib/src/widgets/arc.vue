<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { defineWidget } from '@vuemotion/core'
import { FigureDefaults } from './defines'
import type { Figure, Grownable, Point } from './defines'
import Super from './figure.vue'

export interface Arc extends Figure, Grownable {
  radius: number
  from?: number
  to?: number
}

const props = withDefaults(defineProps<Arc>(), {
  ...FigureDefaults,
  progress: 1,
  from: 0,
  to: 360,
})
const options = defineWidget(props)

function polarToCartesian(center: Point, radius: number, angleInDegrees: number): Point {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180
  return [
    center[0] + (radius * Math.cos(angleInRadians)),
    center[1] + (radius * Math.sin(angleInRadians)),
  ]
}

function describeArc(center: Point, radius: number, startAngle: number, endAngle: number): string {
  if (Math.abs(startAngle - endAngle) % 360 <= 1e-6) {
    return [
      'M',
      ...center,
      'm',
      -radius,
      0,
      'a',
      radius,
      radius,
      0,
      1,
      0,
      radius * 2,
      0,
      'a',
      radius,
      radius,
      0,
      1,
      0,
      -radius * 2,
      0,
    ].join(' ')
  }
  const start = polarToCartesian(center, radius, endAngle)
  const end = polarToCartesian(center, radius, startAngle)
  const largeArcFlag = Number(endAngle - startAngle > 180)
  return [
    'M',
    ...start,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    ...end,
  ].join(' ')
}

const path = computed(() => describeArc(
  [options.x ?? 0, options.y ?? 0],
  options.radius,
  options.from,
  options.to * options.progress,
))
</script>

<template>
  <Super v-slot="slotProps" v-bind="options">
    <path v-bind="slotProps" :d="path" />
  </Super>
</template>
