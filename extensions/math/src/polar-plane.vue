<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import { Arc, Line, Text } from '@vue-motion/lib'
import { type WidgetOptions, widget } from '@vue-motion/lib'

export interface PolarPlaneOptions extends WidgetOptions {
  radius: number
  interval?: number
  intervalR?: number
  trend?: (count: number) => string
  baseUnit?: 'radian' | 'degree'
  divide?: number
  fontSize?: number
  fontColor?: string
}

const props = defineProps<PolarPlaneOptions>()
const options = defineWidget<typeof props>(props)
</script>

<template>
  <g v-bind="widget(options)">
    <!-- Axes -->
    <Line :from="[-radius, 0]" :to="[radius, 0]" border-color="white" />
    <Line :from="[0, -radius]" :to="[0, radius]" border-color="white" />

    <!-- Circular Arcs -->
    <g v-for="r in Math.floor(360 / (options.interval ?? 100))" :key="r">
      <Arc :radius="r * (options.interval ?? 100)" :border-width="1" fill-color="none" />
    </g>

    <!-- Radial Lines -->
    <g v-for="a in options.divide ?? 20" :key="a">
      <Line
        :from="[0, 0]" :to="[radius, 0]" :rotation="a * (360 / (options.divide ?? 20))" border-color="white"
        :border-width="1"
      />
    </g>

    <!-- Labels at each radial line -->
    <g v-for="at in options.divide ?? 20" :key="at">
      <!-- Convert degrees to radians by multiplying by Math.PI / 180 -->
      <Text
        :x="Math.cos(at * (360 / (options.divide ?? 20)) * (Math.PI / 180)) * (radius + 15)"
        :y="-Math.sin(at * (360 / (options.divide ?? 20)) * (Math.PI / 180)) * (radius + 15)" text-anchor="middle"
        alignment-baseline="middle"
        :fill-color="options.fontColor ?? 'white'"
        :font-size="options.fontSize ?? 12"
      >
        {{ options.trend ? options.trend(at) : at * (360 / (options.divide ?? 20)) }}°
      </Text>
    </g>
  </g>
</template>
