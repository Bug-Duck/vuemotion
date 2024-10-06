<script setup lang="ts">
import { useSimpleChart } from './utils/useSimpleChart.ts'
import type { LineChartOptions } from '.'
import { LineChart } from '.'

export interface ScatterChartOptions extends LineChartOptions {
}

const props = withDefaults(defineProps<ScatterChartOptions>(), {
  gridAlign: false,
})
const {
  options,
} = useSimpleChart<ScatterChartOptions>(props)

options.style ??= {}
options.style = {
  showLine: false,
  animateIndex: true,
  ...options.style,
}
</script>

<template>
  <LineChart v-bind="options">
    <slot />
  </LineChart>
</template>

<style scoped>

</style>
