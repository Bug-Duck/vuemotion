<script lang="ts" setup>
import { computed } from "vue";
import { Vector } from "../animations/typings";
import type { FigureOptions } from "./figure";
import { defineWidget } from "@vue-motion/core";
import Polygon from "./polygon.vue";
import { widget, WidgetIns } from "./widget";
import type { Growable } from "../animations";

export interface ArrowOptions extends FigureOptions, Growable {
  from: Vector;
  to: Vector;
}

const props = defineProps<ArrowOptions>();
const options = defineWidget(props);

const current = computed(() => {
  const dx = options.to[0] - options.from[0];
  const dy = options.to[1] - options.from[1];
  return {
    x: options.from[0] + dx * (options.progress ?? 1),
    y: options.from[1] + dy * (options.progress ?? 1),
  };
});

const rotation = computed(() => {
  const delta = [
    options.to[0] - options.from[0],
    options.to[1] - options.from[1],
  ];
  return Math.atan2(delta[1], delta[0]);
});

export type ArrowIns = ArrowOptions & WidgetIns;
</script>

<template>
  <g v-bind="widget(options)">
    <line
      :x1="options.from[0]"
      :y1="options.from[1]"
      :x2="current.x"
      :y2="current.y"
    />
    <g
      :transform="`translate(${current.x}, ${current.y}) rotate(${(rotation * 180) / Math.PI})`"
    >
      <Polygon
        :points="[
          [0, -10],
          [0, 10],
          [Math.sqrt(300), 0],
        ]"
      />
    </g>
  </g>
</template>
