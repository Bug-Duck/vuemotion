<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { defineWidget } from '@vuemotion/core'
import type { Vector } from '../animations/typings'
import { type FigureOptions, figure } from './figure'

export interface PolygonOptions extends FigureOptions {
  points: Vector[]
}

const props = defineProps<PolygonOptions>()
const options = defineWidget(props)

const points = computed(() => options.points.map((p: Vector) => p.join(',')).join(' '))
</script>

<template>
  <polygon v-bind="figure(options)" :points="points">
    <slot />
  </polygon>
</template>
