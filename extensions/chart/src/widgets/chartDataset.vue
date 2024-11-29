<script setup lang="ts">
import type { WidgetOptions } from "@vue-motion/lib";
import { widget } from "@vue-motion/lib";
import type { ReturnWidget } from "@vue-motion/core";
import { defineWidget } from "@vue-motion/core";
import type { Ref } from "vue";
import { inject, provide, ref, unref } from "vue";

import type { ChartDataOptions, ChartStyle } from "..";
import type { BaseSimpleChartData } from "./baseSimpleChart.vue";

export interface ChartDatasetOptions extends WidgetOptions {
  label: string;
  style?: ChartStyle;
}

export interface BaseChartDataSet<SpecificChartStyle> {
  label: string;
  data: ReturnWidget<ChartDataOptions>[];
  style?: SpecificChartStyle;
}

const props = defineProps<ChartDatasetOptions>();
const options = defineWidget<ChartDatasetOptions>(props);

const dataset = ref<BaseChartDataSet<ChartStyle>>({
  label: options.label,
  data: [],
  style: options.style,
});
provide("chartDataset", dataset);

const datasetList = inject<Ref<BaseSimpleChartData>>("chartData");
datasetList?.value.datasets.push(
  unref(dataset) as BaseChartDataSet<ChartStyle>,
);
</script>

<template>
  <g v-bind="widget(options)">
    <slot />
  </g>
</template>

<style scoped></style>
