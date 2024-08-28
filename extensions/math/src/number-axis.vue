<script setup lang="ts">
import { Widget, Line, Polygon } from '@vue-motion/lib'
import { defineWidget } from '@vue-motion/core'
import type { NumberAxis } from './number-axis'
import type { Widget } from '@vue-motion/lib'

export interface NumberAxis extends Widget {
  interval?: number
  trend?: (count: number) => string
  tip?: string // Arrow tip color or 'none'
  trim?: string // Arrow trim color or 'none'
  fontColor?: string // Font color
  fontSize?: number // Font size
  range: [number, number]
}

const props = defineProps<numberAxis>()
const options = defineWidget<numberAxis>(props)

const interval = props.interval ?? 50

function range(start: number, end: number, step = 1) {
  const array = []
  for (let i = start; i < end; i += step) {
    array.push(i)
  }
  return array
}
</script>

<template>
  <Widget :scale-x="options.scaleX" :scale-y="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y">
    <!-- <line :x1="options.range[0] * interval" :x2="options.range[1] * interval" :y1="0" :y2="0" :stroke="options.trim ?? 'white'" :stroke-width="5"></line>
    <polygon points="15,0 0,20 0,-20" :fill="options.trim ?? 'white'" :transform="`translate(${options.range[1] * interval}, 0)`"></polygon>
    <line y1="5" y2="-5" v-for=""></line> -->
    <Line :from="[props.range[0] * interval, 0]" :to="[props.range[1] * interval, 0]" :border="options.trim ?? 'white'" />
    <Polygon
      :points="[
        [15 + props.range[1] * interval, 0],
        [props.range[1] * interval, 20],
        [props.range[1] * interval, -20],
      ]" :fill="options.tip ?? 'white'" :border="options.tip ?? 'white'"
    />
    <Line v-for="i in range(...props.range)" :key="i" :from="[i * interval, 10]" :to="[i * interval, -10]" />
  </Widget>
</template>
