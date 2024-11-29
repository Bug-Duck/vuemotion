<script setup lang="ts">
import type { LineChartOptions } from "..";
import { LineChart } from "..";
import { useSimpleChart } from "../utils/useSimpleChart.ts";

export type ScatterChartOptions = LineChartOptions;

const props = withDefaults(defineProps<ScatterChartOptions>(), {
  gridAlign: false,
});
const { options } = useSimpleChart<ScatterChartOptions>(props);

options.style ??= {};
options.style = {
  showLine: false,
  animateIndex: true,
  ...options.style,
};
</script>

<template>
  <LineChart v-bind="options">
    <slot />
  </LineChart>
</template>

<style scoped></style>
