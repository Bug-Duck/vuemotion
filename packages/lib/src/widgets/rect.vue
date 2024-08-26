<script setup lang="ts">
import { defineProps } from 'vue'
import { defineWidget } from '@vuemotion/core'
import type { Figure } from './defines'
import { FigureDefaults } from './defines'
import Super from './figure.vue'

export interface Rect extends Figure {
  width: number
  height: number
  radius?: number
  // | [number, number]
  // | [number, number, number, number]
  // | [number, number, number, number, number, number, number, number]
}

const props = withDefaults(defineProps<Rect>(), FigureDefaults)
const options = defineWidget(props)
</script>

<template>
  <Super v-slot="slotProps" v-bind="options">
    <text
      v-bind="slotProps"
      :width="options.width"
      :height="options.height"
      :radius="radius"
    />
  </Super>
</template>
