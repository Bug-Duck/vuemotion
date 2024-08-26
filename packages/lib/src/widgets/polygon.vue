<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { defineWidget } from '@vuemotion/core'
import type { Figure, Point } from './defines'
import { FigureDefaults } from './defines'
import Super from './figure.vue'

export interface Polygon extends Figure {
  points: Point[]
}

const props = withDefaults(defineProps<Polygon>(), FigureDefaults)
const options = defineWidget(props)

const points = computed(() => options.points.map((p: Point) => p.join(',')).join(' '))
</script>

<template>
  <Super v-slot="slotProps" v-bind="options">
    <polygon v-bind="slotProps" :points="points">
      <slot />
    </polygon>
  </Super>
</template>
