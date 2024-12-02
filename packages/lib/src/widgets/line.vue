<script setup lang="ts">
import { defineProps, computed } from "vue";
import { defineWidget } from "@vue-motion/core";
import type { Vector } from "../animations/typings";
import type { Growable } from "../animations";
import type { FigureIns, FigureOptions } from "./figure";
import { figure } from "./figure";

export interface LineOptions extends FigureOptions, Growable {
  from: Vector;
  to: Vector;
}
export type LineIns = LineOptions & FigureIns;

const props = defineProps<LineOptions>();
const options = defineWidget(props);

const current = computed(() => {
  const dx = options.to[0] - options.from[0];
  const dy = options.to[1] - options.from[1];
  return {
    x: options.from[0] + dx * (options.progress ?? 1),
    y: options.from[1] + dy * (options.progress ?? 1),
  };
});
</script>

<template>
  <line
    v-bind="figure(options)"
    :x1="options.from[0]"
    :y1="options.from[1]"
    :x2="current.x"
    :y2="current.y"
  />
</template>
