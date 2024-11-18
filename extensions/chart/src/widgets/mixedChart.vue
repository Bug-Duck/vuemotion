<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import { type Ref, inject, provide, ref, toRaw, watchEffect } from 'vue'
import { widget } from '@vue-motion/lib'
import { DateTime } from 'luxon'
import type { ChartLayoutConfig } from './chartLayout.vue'
import ChartLayout from './chartLayout.vue'
import type { BaseSimpleChartData, BaseSimpleChartOptions } from './baseSimpleChart.vue'

export interface MixedChartOptions extends BaseSimpleChartOptions {
}

export interface MixedChartData {
  data: BaseSimpleChartData
  options: BaseSimpleChartOptions
}

const props = withDefaults(defineProps<MixedChartOptions>(), {
  gridAlign: true,
})
const options = defineWidget<MixedChartOptions>(props)
provide('mixedChartOptions', options)

const mixedChartData = inject<Ref<MixedChartData[]>>('mixedChartData', ref<MixedChartData[]>([]))
provide('mixedChartData', mixedChartData)
const mixedData = inject<Ref<BaseSimpleChartData>>('mixedData', ref({ datasets: [] }))
provide('mixedData', mixedData)

const layoutConfig = inject<Ref<ChartLayoutConfig>>('chartLayoutConfig', ref<ChartLayoutConfig>({}))
provide('chartLayoutConfig', layoutConfig)

const mixedOptions = ref<BaseSimpleChartOptions>({})

watchEffect(() => {
  const stringLabels: string[] = []
  const dateLabels: DateTime[] = []
  mixedChartData.value.forEach((data) => data.data.labels?.forEach((label) => {
    if (typeof label === 'string')
      stringLabels.push(label)
    else if (label instanceof DateTime)
      dateLabels.push(label)
  }))
  mixedData.value.labels = options.labels ?? (stringLabels.length > 0 ? stringLabels : dateLabels)
  mixedData.value.datasets = mixedChartData.value.flatMap((data) => data.data.datasets)
}, {
  flush: 'post',
})

watchEffect(() => {
  mixedChartData.value.forEach((data) => {
    Object.assign(mixedOptions.value, toRaw(data.options))
  })
}, {
  flush: 'post',
})

watchEffect(() => {
  mixedChartData.value.forEach((data) => {
    data.options.progress = options.progress
  })
})
</script>

<template>
  <g v-bind="widget(options)">
    <ChartLayout
      v-if="!options.layout"
      v-bind="{
        gridAlign: true,
        edgeOffset: !(mixedOptions.gridAlign ?? options.gridAlign),
        ...mixedOptions,
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
