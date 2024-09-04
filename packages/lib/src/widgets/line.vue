<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { Vector } from '../animations/typings'
import type { FigureOptions } from './figure'
import { figure } from './figure'
import { Grownable } from '../animations'

export interface LineOptions extends FigureOptions, Grownable {
  from: Vector
  to: Vector
}

const props = defineProps<LineOptions>()
const options = defineWidget(props)
</script>

<template>
  <line
    v-bind="figure(options)"
    :x1="options.from[0]"
    :y1="options.from[1]"
    :x2="options.to[0] * (options.progress ?? 1)"
    :y2="options.to[1] * (options.progress ?? 1)"
  />
</template>
