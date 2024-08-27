<script setup lang="ts">
import { defineWidget } from '@vuemotion/core'
import { Widget as Super } from '@vuemotion/lib'
import type { ProgressBarOptions } from './progress-bar'

const props = defineProps<ProgressBarOptions>()
const options = defineWidget<ProgressBarOptions>(props)
</script>

<template>
  <Super v-bind="options">
    <rect :x="-options.width / 2" :y="-10" rx="10" ry="10" :fill="options.fill || 'gray'" :width="options.width" :height="20" />
    <rect :x="-options.width / 2 + 5" :y="-5" rx="5" ry="5" :fill="options.fill || 'lightgreen'" :width="(options.width - 10) * options.value" :height="10" />
  </Super>
</template>
