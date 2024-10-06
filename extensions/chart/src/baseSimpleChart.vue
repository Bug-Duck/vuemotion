<script setup lang="ts">
import type { Growable } from '@vue-motion/lib'
import { widget } from '@vue-motion/lib'
import type { DateTime } from 'luxon'
import { withDefaults } from 'vue'
import ChartLayout from './chartLayout.vue'
import type { BaseChartOptions, ChartStyle } from './baseChart.ts'
import type { BaseChartDataSet } from './chartDataset.vue'
import { useSimpleChart } from './utils/useSimpleChart.ts'

/**
 * BaseSimpleChartOptions
 * @interface
 * @extends BaseChartOptions
 */
export interface BaseSimpleChartOptions extends BaseChartOptions, Growable {
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
   * @property ChartStyle style
   * @description
   * style is an object that defines the style of the chart.
   */
  style?: ChartStyle
}

const props = withDefaults(defineProps<BaseSimpleChartOptions>(), {
  gridAlign: true,
})
const {
  options,
} = useSimpleChart<BaseSimpleChartOptions>(props)
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
