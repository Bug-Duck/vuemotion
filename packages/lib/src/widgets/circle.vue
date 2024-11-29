<script setup lang="ts">
import { defineProps } from "vue";
import { defineWidget } from "@vue-motion/core";
import type { FigureMixin, FigureOptions } from "./figure";
import { figure } from "./figure";

export interface CircleOptions extends FigureOptions {
  r: number;
  cx: number;
  cy: number;
}
export type CircleMixin = CircleOptions & FigureMixin;

const props = defineProps<CircleOptions>();
const options = defineWidget(props);
</script>

<template>
  <circle
    :cx="options.cx"
    :cy="options.cy"
    :r="options.r"
    v-bind="figure(options)"
  />
</template>
