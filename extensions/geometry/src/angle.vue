<script setup lang="ts">
import { defineWidget } from "@vue-motion/core";
import { Arc, type FigureOptions, Line, figure } from "@vue-motion/lib";

export interface AngleOptions extends FigureOptions {
  value: number;
  start?: number;
  lengthFrom?: number;
  lengthTo?: number;
  radius?: number;
}

const props = defineProps<AngleOptions>();
const options = defineWidget<AngleOptions>(props);
</script>

<template>
  <g v-bind="figure(options)">
    <Line
      :from="[options.x ?? 0, options.y ?? 0]"
      :to="[options.lengthFrom ?? 100, options.y ?? 0]"
      :rotation="options.start ?? 0"
    />
    <Line
      :from="[options.x ?? 0, options.y ?? 0]"
      :to="[options.lengthTo ?? 100, options.y ?? 0]"
      :rotation="options.value"
    />
    <Arc
      :radius="Math.min(options.lengthFrom ?? 100, options.lengthTo ?? 100) / 3"
      :from="options.start ?? 0"
      :to="(options.start ?? 0) + options.value"
      fill-color="none"
    />
  </g>
</template>
