<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { FigureOptions } from './figure'
import { figure } from './figure'

export interface PathOptions extends FigureOptions {
  d: string
}

const props = defineProps<PathOptions>()
const options = defineWidget(props)
</script>

<template>
  <g v-bind="figure(options)">
    <path :d="d" />
  </g>
</template>
