<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { defineWidget } from '@vue-motion/core'
import type { Vector } from '../animations/typings'
import type { FigureMixin, FigureOptions } from './figure'
import { figure } from './figure'

export interface PolygonOptions extends FigureOptions {
  points: Vector[]
}
export type PolygonMixin = PolygonOptions & FigureMixin

const props = defineProps<PolygonOptions>()
const options = defineWidget(props)

const points = computed(() => options.points.map((p: Vector) => p.join(',')).join(' '))
</script>

<template>
  <polygon v-bind="figure(options)" :points="points">
    <slot />
  </polygon>
</template>
