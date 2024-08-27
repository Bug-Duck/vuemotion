<script setup lang="ts">
import { defineWidget } from '@vuemotion/core'
import type { Point } from './typings'
import type { Figure } from './figure'
import { figure } from './figure'

export interface Line extends Figure {
  from: Point
  to: Point
}

const props = defineProps<Line>()
const options = defineWidget(props)
</script>

<template>
  <line
    v-bind="figure(options)"
    :x1="options.from[0]"
    :y1="options.from[1]"
    :x2="options.to[0]"
    :y2="options.to[1]"
  />
</template>
