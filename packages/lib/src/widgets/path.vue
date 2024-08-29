<script setup lang="ts">
import { defineWidget } from '@vue-motion/core';
import { figure, FigureOptions } from './figure'

export interface PathOptions extends FigureOptions {
  d: string;
}

const props = defineProps<PathOptions>()
const options = defineWidget(props)
</script>

<template>
  <g v-bind="figure(options)">
    <path :d="d"></path>
  </g>
</template>