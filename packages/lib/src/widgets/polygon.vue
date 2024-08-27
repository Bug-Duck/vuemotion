<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { defineWidget } from '@vuemotion/core'
import type { Point } from './typings'
import { type Figure, figure } from './figure'

export interface Polygon extends Figure {
  points: Point[]
}

const props = defineProps<Polygon>()
const options = defineWidget(props)

const points = computed(() => options.points.map((p: Point) => p.join(',')).join(' '))
</script>

<template>
  <polygon v-bind="figure(options)" :points="points">
    <slot />
  </polygon>
</template>
