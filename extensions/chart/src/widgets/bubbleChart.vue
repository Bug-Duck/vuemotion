<script setup lang="ts">
import type { LineChartOptions } from "..";
import { LineChart } from "..";
import { useSimpleChart } from "../utils/useSimpleChart.ts";

export type BubbleChartOptions = LineChartOptions;

const props = withDefaults(defineProps<BubbleChartOptions>(), {
  gridAlign: false,
});
const { options } = useSimpleChart<BubbleChartOptions>(props);

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
