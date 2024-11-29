<script setup lang="ts">
import { defineProps } from "vue";
import { defineWidget } from "@vue-motion/core";
import type { Vector } from "../animations/typings";
import type { Growable } from "../animations";
import type { FigureMixin, FigureOptions } from "./figure";
import { figure } from "./figure";

export interface LineOptions extends FigureOptions, Growable {
  from: Vector;
  to: Vector;
}
export type LineMixin = LineOptions & FigureMixin;

const props = defineProps<LineOptions>();
const options = defineWidget(props);
</script>

<template>
  <line
    v-bind="figure(options)"
    :x1="options.from[0]"
    :y1="options.from[1]"
    :x2="options.to[0] * (options.progress ?? 1)"
    :y2="options.to[1] * (options.progress ?? 1)"
  />
</template>
