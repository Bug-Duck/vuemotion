<script setup lang="ts">
import { defineProps } from 'vue'
import { defineWidget } from '@vuemotion/core'
import type { Figure } from './figure'
import { figure } from './figure'

export interface Rect extends Figure {
  width: number
  height: number
  radius?: number
  // | [number, number]
  // | [number, number, number, number]
  // | [number, number, number, number, number, number, number, number]
}

const props = defineProps<Rect>()
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
