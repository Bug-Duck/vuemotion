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
  domainX: [number, number]
  intervalY?: number
  trendY?: (count: number) => string
  tipY?: string // Arrow tip color or 'none'
  trimY?: string // Arrow trim color or 'none'
  fontColorY?: string // Font color
  fontSizeY?: number // Font size
  domainY: [number, number]
  baseUnit?: 'number' | 'radian' | 'degree'
  grid?: boolean
  gridColor?: string
  gridWidth?: number
  yRotation?: number
}

const props = defineProps<NumberPlaneOptions>()
const options = defineWidget<NumberPlaneOptions>(props)

const Yrotation = options.yRotation ?? 90
const domain = [options.domainX.sort(), options.domainY.sort()]
</script>

<template>
  <g v-bind="widget(options)">
    <NumberAxis
      :base-unit="options.baseUnit"
      :interval="options.intervalX"
      :trend="
        (x) => (x === 0 ? '' : (options.trendX ?? ((x) => x.toString()))(x))
      "
      :tip="options.tipX ?? 'white'"
      :trim="options.trimX ?? 'white'"
      :font-color="options.fontColorX ?? 'white'"
      :font-size="options.fontSizeX"
      :domain="domain[0]"
      :progress="options.progress ?? 1"
    />
    <NumberAxis
      :interval="options.intervalY ?? 100"
      :tip="options.tipY ?? 'white'"
      :trim="options.trimY ?? 'white'"
      :font-color="options.fontColorY ?? 'white'"
      :font-size="options.fontSizeY"
      :domain="domain[1]"
      :rotation="-Yrotation"
      :trend="
        (x) => (x === 0 ? '' : (options.trendY ?? ((x) => x.toString()))(x))
      "
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
      v-for="i in domain[0][1] - domain[0][0]"
      v-if="options.grid"
      :from="[
        i * (options.intervalX ?? 100),
        options.domainY[0] * (options.intervalY ?? 100),
      ]"
      :to="[
        i * (options.intervalX ?? 100),
        options.domainY[1] * (options.intervalY ?? 100),
      ]"
      :border-color="options.gridColor ?? 'white'"
      :border-width="options.gridWidth ?? 1"
      :x="(options.domainX[0] - 1) * (options.intervalX ?? 100)"
      :progress="options.progress ?? 1"
    />
    <Line
      v-for="i in domain[1][1] - domain[1][0]"
      v-if="options.grid"
      :from="[
        options.domainX[0] * (options.intervalX ?? 100),
        i * (options.intervalY ?? 100),
      ]"
      :to="[
        options.domainX[1] * (options.intervalX ?? 100),
        i * (options.intervalY ?? 100),
      ]"
      :border-color="options.gridColor ?? 'white'"
      :border-width="options.gridWidth ?? 1"
      :y="(options.domainY[0] - 1) * (options.intervalY ?? 100)"
      :progress="options.progress ?? 1"
    />
  </g>
</template>
