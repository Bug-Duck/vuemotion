<script setup lang="ts">
import { defineProps } from "vue";
import { defineWidget } from "@vue-motion/core";
import type { FigureIns, FigureOptions } from "./figure";
import { figure } from "./figure";

export interface CircleOptions extends FigureOptions {
  radius: number;
}
export type CircleIns = CircleOptions & FigureIns;

const props = defineProps<CircleOptions>();
const options = defineWidget(props);
</script>

<template>
  <g v-bind="figure(options)">
    <circle :r="options.radius" />
  </g>
</template>
