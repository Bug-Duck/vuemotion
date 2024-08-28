<script setup lang="ts">
import { defineProps } from 'vue'
import { defineWidget } from '@vue-motion/core'
import type { FigureOptions } from './figure'
import { figure } from './figure'

export interface RectOptions extends FigureOptions {
  width: number
  height: number
  radius?: number
  // | [number, number]
  // | [number, number, number, number]
  // | [number, number, number, number, number, number, number, number]
}

const props = defineProps<RectOptions>()
const options = defineWidget(props)
</script>

<template>
  <text
    v-bind="figure(options)"
    :width="options.width"
    :height="options.height"
    :radius="radius"
  />
</template>
