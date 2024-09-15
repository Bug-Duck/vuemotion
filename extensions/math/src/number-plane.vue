<script setup lang="ts">
import type { Growable, WidgetOptions } from '@vue-motion/lib'
import { Line, Text, widget } from '@vue-motion/lib'
import { defineWidget } from '@vue-motion/core'
import { NumberAxis } from '.'

export interface NumberPlaneOptions extends WidgetOptions, Growable {
  intervalX?: number
  trendX?: (count: number) => string
  tipX?: string // Arrow tip color or 'none'
  trimX?: string // Arrow trim color or 'none'
  fontColorX?: string // Font color
  fontSizeX?: number // Font size
  rangesX: [number, number]
  intervalY?: number
  trendY?: (count: number) => string
  tipY?: string // Arrow tip color or 'none'
  trimY?: string // Arrow trim color or 'none'
  fontColorY?: string // Font color
  fontSizeY?: number // Font size
  rangesY: [number, number]

  grid?: string
  gridWidth?: number
}

const props = defineProps<NumberPlaneOptions>()
const options = defineWidget<NumberPlaneOptions>(props)
</script>

<template>
  <g v-bind="widget(options)">
    <NumberAxis
      :interval="options.intervalX ?? 100"
      :trend="(x => x === 0 ? '' : (options.trendY ?? (x => x.toString()))(x))"
      :tip="options.tipX ?? 'white'"
      :trim="options.trimX ?? 'white'"
      :font-color="options.fontColorX ?? 'white'"
      :font-size="options.fontSizeX"
      :ranges="options.rangesX"
      :progress="options.progress ?? 1"
    />
    <NumberAxis
      :interval="options.intervalY ?? 100"
      :tip="options.tipY ?? 'white'"
      :trim="options.trimY ?? 'white'"
      :font-color="options.fontColorY ?? 'white'"
      :font-size="options.fontSizeY"
      :ranges="options.rangesY"
      :rotation="-90"
      :trend="(x => x === 0 ? '' : (options.trendY ?? (x => x.toString()))(x))"
      :progress="options.progress ?? 1"
    />
    <Text
      :fill-color="options.fontColorX ?? 'white'"
      :font-size="20"
      :x="20"
      :y="20"
    >
      0
    </Text>
    <Line
      v-for="i in Math.abs(options.rangesX[1] - options.rangesX[0]) + 1"
      :from="[i * (options.intervalX ?? 100), options.rangesY[0] * (options.intervalY ?? 100)]"
      :to="[i * (options.intervalX ?? 100), options.rangesY[1] * (options.intervalY ?? 100)]"
      :border-color="options.grid ?? 'white'"
      :border-width="options.gridWidth ?? 1"
      :x="(options.rangesX[0] - 1) * (options.intervalX ?? 100)"
      :progress="options.progress ?? 1"
    />
    <Line
      v-for="i in Math.abs(options.rangesY[1] - options.rangesY[0]) + 1"
      :from="[options.rangesX[0] * (options.intervalX ?? 100), i * (options.intervalY ?? 100)]"
      :to="[options.rangesX[1] * (options.intervalX ?? 100), i * (options.intervalY ?? 100)]"
      :border-color="options.grid ?? 'white'"
      :border-width="options.gridWidth ?? 1"
      :y="(options.rangesY[0] - 1) * (options.intervalY ?? 100)"
      :progress="options.progress ?? 1"
    />
  </g>
</template>
