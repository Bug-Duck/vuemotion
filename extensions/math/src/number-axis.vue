<script setup lang="ts">
import { defineWidget } from "@vue-motion/core";
import type { Growable, WidgetOptions } from "@vue-motion/lib";
import { Line, Polygon, Text, widget } from "@vue-motion/lib";

export interface NumberAxisOptions extends WidgetOptions, Growable {
  baseUnit?: "number" | "radian" | "degree";
  interval?: number;
  trend?: (count: number) => string;
  tip?: string; // Arrow tip color or 'none'
  trim?: string; // Arrow trim color or 'none'
  fontColor?: string; // Font color
  fontSize?: number; // Font size
  domain: [number, number];
}

const props = defineProps<NumberAxisOptions>();
const options = defineWidget<NumberAxisOptions>(props);

function getIntervalOrDefault(interval?: number): number {
  return interval ?? 100;
}

function getProgressOrDefault(progress?: number): number {
  return progress ?? 1;
}
</script>

<template>
  <g v-if="options.baseUnit === 'radian'" v-bind="widget(options)">
    <Line
      :from="[
        options.domain[0] *
          getIntervalOrDefault(options.interval) *
          getProgressOrDefault(options.progress),
        0,
      ]"
      :to="[
        options.domain[1] *
          getIntervalOrDefault(options.interval) *
          getProgressOrDefault(options.progress),
        0,
      ]"
      :border-color="options.trim ?? 'white'"
    />
    <Line
      v-for="i in Math.floor(
        (Math.abs(options.domain[1] - options.domain[0]) / Math.PI) * 2,
      )"
      :key="i"
      :from="[(i + 1) * (options.interval ?? Math.PI * 50), -10]"
      :to="[(i + 1) * (options.interval ?? Math.PI * 50), 10]"
      :border-color="trim ?? 'white'"
      :x="(options.domain[0] - 1) * (options.interval ?? Math.PI * 50)"
    />
    <Text
      v-for="i in Math.floor(
        (Math.abs(options.domain[1] - options.domain[0]) / Math.PI) * 2,
      )"
      :key="i"
      border-color="none"
      :fill-color="options.fontColor ?? 'white'"
      :x="(options.domain[0] + i) * (options.interval ?? Math.PI * 50)"
      :y="20"
      :rotation="-(options.rotation ?? 0)"
      align="start"
      :font-size="20"
    >
      {{
        (options.trend ?? ((x) => x.toString()))((i + options.domain[0]) / 2)
      }}
      π
    </Text>
    <Polygon
      :points="[
        [0, -10],
        [0, 10],
        [Math.sqrt(300), 0],
      ]"
      :border-color="options.tip ?? 'white'"
      :fill-color="options.tip ?? 'white'"
      :x="options.domain[1] * getIntervalOrDefault(options.interval)"
      :y="0"
    />
  </g>
  <!-- ToDo: Add support for degree -->
  <g v-else v-bind="widget(options)">
    <Line
      :from="[
        options.domain[0] *
          getIntervalOrDefault(options.interval) *
          getProgressOrDefault(options.progress),
        0,
      ]"
      :to="[
        options.domain[1] *
          getIntervalOrDefault(options.interval) *
          getProgressOrDefault(options.progress),
        0,
      ]"
      :border-color="options.trim ?? 'white'"
    />
    <Line
      v-for="i in Math.abs(options.domain[1] - options.domain[0])"
      :key="i"
      :from="[(i + 1) * getIntervalOrDefault(options.interval), -10]"
      :to="[(i + 1) * getIntervalOrDefault(options.interval), 10]"
      :border-color="options.trim ?? 'white'"
      :x="(options.domain[0] - 1) * getIntervalOrDefault(options.interval)"
    />
    <Text
      v-for="i in Math.abs(options.domain[1] - options.domain[0] + 1)"
      :key="i"
      border-color="none"
      :fill-color="options.fontColor ?? 'white'"
      :x="(options.domain[0] + i - 1) * getIntervalOrDefault(options.interval)"
      :y="20"
      :rotation="-(options.rotation ?? 0)"
      align="start"
      :font-size="20"
    >
      {{ (options.trend ?? ((x) => x.toString()))(i + options.domain[0] - 1) }}
    </Text>
    <Polygon
      :points="[
        [0, -10],
        [0, 10],
        [Math.sqrt(300), 0],
      ]"
      :border-color="options.tip ?? 'white'"
      :fill-color="options.tip ?? 'white'"
      :x="options.domain[1] * getIntervalOrDefault(options.interval)"
      :y="0"
    />
  </g>
</template>
