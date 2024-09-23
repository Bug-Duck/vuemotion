<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import { type FigureOptions, figure } from '@vue-motion/lib'
import { computed, defineProps } from 'vue'
import { Arc, Text } from '@vue-motion/lib'

export interface DotOptions extends FigureOptions {
  size?: number
  tag?: string | null
  position?: 'left' | 'right' | 'top' | 'bottom' | [number, number]
}

const props = defineProps<DotOptions>()
const options = defineWidget<DotOptions>(props)

const position = computed(() => {
  if (Array.isArray(options.position)) {
    return options.position
  }
  if (options.position === 'left') {
    return [-(options.size ?? 20), 0]
  }
  if (options.position === 'right') {
    return [options.size ?? 20, 0]
  }
  if (options.position === 'top') {
    return [0, -(options.size ?? 20)]
  }
  if (options.position === 'bottom') {
    return [0, options.size ?? 20]
  }
  return [0, -(options.size ?? 20)]
})
</script>

<template>
  <g v-bind="figure(options)">
    <Arc :radius="(options.size ?? 20) / 2"/>
    <Text v-if="options.tag" :x="position[0]" :y="position[1]">{{ options.tag }}</Text>
  </g>
</template>
