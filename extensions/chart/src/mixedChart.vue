<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import { type Ref, inject, provide, ref, watchEffect } from 'vue'
import { widget } from '@vue-motion/lib'
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

watchEffect(() => {
  mixedData.value.labels = options.labels ?? mixedChartData.value.flatMap(data => data.data.labels)
  mixedData.value.datasets = mixedChartData.value.flatMap(data => data.data.datasets)
}, {
  flush: 'post',
})

const layoutConfig = inject<Ref<ChartLayoutConfig>>('chartLayoutConfig', ref<ChartLayoutConfig>({}))
provide('chartLayoutConfig', layoutConfig)

const mixedOptions = ref<BaseSimpleChartOptions>({})

watchEffect(() => {
  mixedChartData.value.forEach((data) => {
    for (const key in data.options) {
      if (key as keyof BaseSimpleChartOptions)
        mixedOptions.value[key as keyof BaseSimpleChartOptions] = data.options[key as keyof BaseSimpleChartOptions]
    }
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
