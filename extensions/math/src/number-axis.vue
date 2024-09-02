<script setup lang="ts">
import { Line, Polygon, Text, widget } from '@vue-motion/lib'
import { defineWidget } from '@vue-motion/core'
import type { WidgetOptions } from '@vue-motion/lib'

export interface NumberAxisOptions extends WidgetOptions {
  interval?: number
  trend?: (count: number) => string
  tip?: string // Arrow tip color or 'none'
  trim?: string // Arrow trim color or 'none'
  fontColor?: string // Font color
  fontSize?: number // Font size
  ranges: [number, number]
}

const props = defineProps<NumberAxisOptions>()
const options = defineWidget<NumberAxisOptions>(props)
</script>

<template>
  <g v-bind="widget(options)">
    <Line
      :from="[options.ranges[0] * (options.interval ?? 100), 0]"
      :to="[options.ranges[1] * (options.interval ?? 100), 0]" 
      :border-color="trim ?? 'white'"
    />
    <Line v-for="i in Math.abs(options.ranges[1] - options.ranges[0]) + 1"
      :from="[i * (options.interval ?? 100), -10]"
      :to="[i * (options.interval ?? 100), 10]"
      :border-color="trim ?? 'white'"
      :x="(options.ranges[0] - 1) * (options.interval ?? 100)"
    />
    <Text v-for="i in Math.abs(options.ranges[1] - options.ranges[0]) + 1"
      border-color="none"
      :fill-color="options.fontColor ?? 'white'"
      :x="(options.ranges[0] - 1 + i) * (options.interval ?? 100)"
      :y="20"
      :rotation="-(options.rotation!?? 0)"
      :align="'start'"
      :font-size="20"
    >{{ (options.trend ?? (x => x.toString()))(i + options.ranges[0] - 1) }}</Text>
    <Polygon
      :points="[
        [0, -10],
        [0, 10],
        [Math.sqrt(300), 0]
      ]"
      :border-color="options.tip ?? 'white'"
      :fill-color="options.tip ?? 'white'"
      :x="options.ranges[1] * (options.interval ?? 100)"
      :y="0"
    />
  </g>
</template>
