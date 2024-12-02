<script setup lang="ts">
import { defineWidget } from "@vue-motion/core";
import { computed, defineProps } from "vue";
import type { Vector } from "../animations/typings";
import type { FigureIns, FigureOptions } from "./figure";
import { figure } from "./figure";

export interface PolygonOptions extends FigureOptions {
  points: Vector[];
}
export type PolygonIns = PolygonOptions & FigureIns;

const props = defineProps<PolygonOptions>();
const options = defineWidget(props);

const _points = computed(() =>
  options.points.map((p: Vector) => p.join(",")).join(" "),
);
</script>

<template>
  <polygon v-bind="figure(options)" :points="_points">
    <slot />
  </polygon>
</template>
