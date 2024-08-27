<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import type { Figure } from './widgets/figure.ts'
import { figure } from './widgets/figure.ts'

withDefaults(defineProps<{
  width: number
  height: number
  theme?: Figure
}>(), {
  theme: () => ({
    fillColor: 'rgba(135,206,250,0.5)',
    borderColor: 'rgba(135,206,250,1)',
    borderWidth: 1,
  }),
})
</script>

<template>
  <svg :width="width" :height="height" style="background-color: black;">
    <g v-bind="figure({ x: width / 2, y: height / 2, ...theme })">
      <slot />
    </g>
  </svg>
</template>
