<script setup lang="ts">
import type { DateTime, DateTimeUnit, Duration } from 'luxon'
import type { WidgetOptions } from '@vue-motion/lib'
import { widget } from '@vue-motion/lib'
import { defineWidget } from '@vue-motion/core'

import type { Ref } from 'vue'
import { inject } from 'vue'
import type { BaseChartDataSet, ChartStyle } from '.'

export interface ChartDataOptions extends WidgetOptions {
  index?: number | DateTimeWithDuration
  cross: number
  weight?: number
  intervalUnit?: DateTimeUnit
  style?: ChartStyle
}

export interface DateTimeWithDuration extends DateTime {
  duration?: Duration
}

const props = defineProps<ChartDataOptions>()
const options = defineWidget<ChartDataOptions>(props)

const dataset = inject<Ref<BaseChartDataSet>>('chartDataset')
dataset?.value.data.push(options)
</script>

<template>
  <g v-bind="widget(options)" />
</template>
