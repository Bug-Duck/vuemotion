<script setup lang="ts">
import { defineProps } from "vue";
import { defineWidget } from "@vue-motion/core";
import type { FigureIns, FigureOptions } from "./figure";
import { figure } from "./figure";

export interface EllipseOptions extends FigureOptions {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  width?: number;
  height?: number;
  radius?: number;
}
export type EllipseIns = EllipseOptions & FigureIns;

const props = defineProps<EllipseOptions>();
const options = defineWidget(props);
</script>

<template>
  <ellipse
    v-bind="figure(options)"
    :cx="options.cx"
    :cy="options.cy"
    :rx="options.rx"
    :ry="options.ry"
    :width="options.width"
    :height="options.height"
  />
</template>
