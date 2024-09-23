<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import { widget, type WidgetOptions } from '@vue-motion/lib'

export interface RowOptions extends WidgetOptions {
  width: number
}

const props = defineProps<RowOptions>()
const options = defineWidget<RowOptions>(props)
</script>

<template>
  <g v-bind="widget(options)">
    <
  </g>
</template>
