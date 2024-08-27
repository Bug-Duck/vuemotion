<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import type { FigureOptions } from './widgets/figure.ts'
import { figure } from './widgets/figure.ts'

withDefaults(defineProps<{
  width: number
  height: number
  theme?: FigureOptions
}>(), {
  theme: () => ({
    fillColor: 'rgba(135,206,250,0.5)',
    borderColor: 'rgba(135,206,250,1)',
    borderWidth: 2,
  }),
})
</script>

<template>
  <svg :width="width" :height="height" style="background-color: black;">
    <g v-bind="figure({ x: width / 2, y: height / 2, scaleY: -1, ...theme })">
      <slot />
    </g>
  </svg>
</template>
