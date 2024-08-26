<script setup lang="ts">
import { defineWidget } from '@vuemotion/core'
import { FigureDefaults } from './defines'
import type { Figure, Point } from './defines'
import Super from './figure.vue'

export interface Line extends Figure {
  from: Point
  to: Point
}

const props = withDefaults(defineProps<Line>(), FigureDefaults)
const options = defineWidget(props)
</script>

<template>
  <Super v-slot="slotProps" v-bind="options">
    <line
      v-bind="slotProps"
      :x1="options.from[0]"
      :y1="options.from[1]"
      :x2="options.to[0]"
      :y2="options.to[1]"
    />
  </Super>
</template>
