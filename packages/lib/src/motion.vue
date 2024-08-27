<script setup lang="ts">
import { defineProps } from 'vue'
import { figure } from './widgets/figure.ts'

defineProps<{
  width: number
  height: number
}>()
</script>

<template>
  <svg :width="width" :height="height" style="background-color: black;">
    <g v-bind="figure({ x: width / 2, y: height / 2 })">
      <slot />
    </g>
  </svg>
</template>
