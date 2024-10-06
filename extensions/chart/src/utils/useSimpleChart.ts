import { defineWidget } from '@vue-motion/core'
import type { Ref } from 'vue'
import { inject, provide, ref } from 'vue'

import type { BaseSimpleChartData, BaseSimpleChartOptions } from '../baseSimpleChart.vue'
import type { ChartLayoutConfig } from '../chartLayout.vue'

export function useSimpleChart<T extends BaseSimpleChartOptions>(props: T) {
  const options = defineWidget<T>(props)

  let data = inject<Ref<BaseSimpleChartData>>('chartData')
  data ??= ref<BaseSimpleChartData>({
    labels: (options as BaseSimpleChartOptions).labels,
    datasets: [],
  })
  provide('chartData', data)
  let layoutConfig = inject<Ref<ChartLayoutConfig>>('chartLayoutConfig')
  layoutConfig ??= ref<ChartLayoutConfig>({})
  provide('chartLayoutConfig', layoutConfig)

  return {
    props,
    options: options as ReturnType<typeof defineWidget<T>>,
    data,
    layoutConfig,
  }
}
