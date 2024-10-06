<script setup lang="ts">
import { widget } from '@vue-motion/lib'
import { defineWidget } from '@vue-motion/core'
import type { DateTime } from 'luxon'
import type { Ref } from 'vue'
import { inject, provide, ref } from 'vue'
import type { ChartLayoutConfig } from './chartLayout.vue'
import ChartLayout from './chartLayout.vue'
import type { BaseChartOptions, ChartStyle } from './baseChart.ts'
import type { BaseChartDataSet } from './chartDataset.vue'

/**
 * BaseSimpleChartOptions
 * @interface
 * @extends BaseChartOptions
 */
export interface BaseSimpleChartOptions extends BaseChartOptions {
  labels?: string[] | DateTime[]
  style?: ChartStyle
}

export interface BaseSimpleChartData {
  /**
   * @property string[] labels
   * @description
   * labels is an array of strings that represent the labels of the chart, which are displayed on the index-axis.
   * It is optional.
   * If not provided, the labels will be generated automatically.
   */
  labels?: string[] | DateTime[]
  /**
   * @property BaseChartDataSet[] datasets
   * @description
   * datasets is an array of datasets that represent the data of the chart.
   */
  datasets: BaseChartDataSet<ChartStyle>[]
  /**
   * @property BaseChartStyle style
   * @description
   * style is an object that defines the style of the chart.
   */
  style?: ChartStyle
}

const props = withDefaults(defineProps<BaseSimpleChartOptions>(), {
  gridAlign: true,
})
const options = defineWidget<BaseSimpleChartOptions>(props)

let data = inject<Ref<BaseSimpleChartData>>('chartData')
data ??= ref<BaseSimpleChartData>({
  labels: options.labels,
  datasets: [],
})
provide('chartData', data)

let layoutConfig = inject<Ref<ChartLayoutConfig>>('chartLayoutConfig')
layoutConfig ??= ref<ChartLayoutConfig>({})
provide('chartLayoutConfig', layoutConfig)
</script>

<template>
  <g v-bind="widget(options)">
    <ChartLayout
      v-if="!options.layout"
      v-bind="{
        size: {
          width: options.width ?? 300,
          height: options.width ?? 300,
        },
        ...options,
        x: 0,
        y: 0,
      }"
    />
    <slot />
  </g>
</template>

<style scoped>

</style>
