<script setup lang="ts">
import { defineProps } from 'vue'
import { defineWidget } from '@vue-motion/core'
import type { FigureMixin, FigureOptions } from './figure'
import { figure } from './figure'

export interface PathOptions extends FigureOptions {
  d: string
}
export type PathMixin = PathOptions & FigureMixin

const props = defineProps<PathOptions>()
const options = defineWidget(props)
</script>

<template>
  <g v-bind="figure(options)">
    <path :d="d" />
  </g>
</template>
