<script setup lang="ts">
import { defineProps } from "vue";
import { defineWidget } from "@vue-motion/core";
import type { FigureIns, FigureOptions } from "./figure";
import { figure } from "./figure";

export interface CircleOptions extends FigureOptions {
  radius: number;
  cx: number;
  cy: number;
}
export type CircleIns = CircleOptions & FigureIns;

const props = defineProps<CircleOptions>();
const options = defineWidget(props);
</script>

<template>
  <circle
    :cx="options.cx"
    :cy="options.cy"
    :r="options.radius"
    v-bind="figure(options)"
  />
</template>
