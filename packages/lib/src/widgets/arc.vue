<script setup lang="ts">
import { defineWidget } from "@vue-motion/core";
import { computed, defineProps, withDefaults } from "vue";
import type { Growable, GrowableIns } from "../animations";
import type { Vector } from "../animations/typings";
import { type FigureOptions, figure } from "./figure";

export interface ArcOptions extends FigureOptions, Growable {
  radius: number;
  from?: number;
  to?: number;
}

export type ArcIns = ArcOptions & GrowableIns;

const props = withDefaults(defineProps<ArcOptions>(), {
  progress: 1,
  from: 0,
  to: 360,
});
const options = defineWidget(props);

function polarToCartesian(
  center: Vector,
  radius: number,
  angleInDegrees: number,
): Vector {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return [
    center[0] + radius * Math.cos(angleInRadians),
    center[1] + radius * Math.sin(angleInRadians),
  ];
}

function describeArc(
  center: Vector,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  if (Math.abs(startAngle - endAngle) % 360 <= 1e-6) {
    return [
      "M",
      ...center,
      "m",
      -radius,
      0,
      "a",
      radius,
      radius,
      0,
      1,
      0,
      radius * 2,
      0,
      "a",
      radius,
      radius,
      0,
      1,
      0,
      -radius * 2,
      0,
    ].join(" ");
  }
  const start = polarToCartesian(center, radius, endAngle);
  const end = polarToCartesian(center, radius, startAngle);
  const largeArcFlag = Number(endAngle - startAngle > 180);
  return ["M", ...start, "A", radius, radius, 0, largeArcFlag, 0, ...end].join(
    " ",
  );
}

const path = computed(() =>
  describeArc(
    [options.x ?? 0, options.y ?? 0],
    options.radius,
    options.from,
    options.to * options.progress,
  ),
);
</script>

<template>
  <path v-bind="figure(options)" :d="path" />
</template>
