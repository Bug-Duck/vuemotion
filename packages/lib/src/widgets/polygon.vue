<script setup lang="ts">
import { defineProps } from 'vue'
import { defineWidget } from '@vuemotion/core'
import type { Figure, Point } from './defines'
import { FigureDefaults } from './defines'
import Super from './figure.vue'

export interface Polygon extends Figure {
  points: Point[]
}

const props = withDefaults(defineProps<Polygon>(), FigureDefaults)
const options = defineWidget(props)
</script>

<template>
  <Super v-bind="options">
    <polygon :points="options.points.map((p: Point) => p.join(',')).join(' ')">
      <slot />
    </polygon>
  </Super>
</template>
