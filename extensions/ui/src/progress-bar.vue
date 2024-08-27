<script setup lang="ts">
import { defineWidget } from '@vuemotion/core'
import { widget } from '@vuemotion/lib'
import type { FigureOptions, Grownable } from '@vuemotion/lib'

export interface ProgressBarOptions extends FigureOptions, Grownable {
  width: number
  value: number
  progressColor: string
}

const props = withDefaults(defineProps<ProgressBarOptions>(), {
  borderColor: 'none',
  fillColor: 'gray',
  progressColor: 'lightgreen',
})
const options = defineWidget<ProgressBarOptions>(props)
</script>

<template>
  <g v-bind="widget(options)">
    <rect
      rx="10" ry="10"
      :x="-options.width / 2" y="-10"
      height="20" :width="options.width"
    />
    <rect
      rx="5" ry="5"
      :x="-options.width / 2 + 5" y="-5"
      :width="(options.width - 10) * options.value" height="10"
      :fill="options.progressColor"
    />
  </g>
</template>
