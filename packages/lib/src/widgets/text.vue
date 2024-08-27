<script setup lang="ts">
import { defineProps } from 'vue'
import { defineWidget } from '@vuemotion/core'
import type { TextOptions } from './text'
import { text } from './text'

const props = withDefaults(defineProps<TextOptions>(), {
  scaleY: -1,
  align: 'middle',
  baseline: 'middle',
})
const options = defineWidget(props)
</script>

<template>
  <text v-bind="text(options)">
    <slot />
  </text>
</template>
