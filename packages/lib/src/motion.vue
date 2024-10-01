<script setup lang="ts">
import { defineProps, provide } from 'vue'
import { figure } from './widgets/figure.ts'

const props = defineProps<{
  width: number
  height: number
}>()

provide('motion-width', props.width)
provide('motion-height', props.height)
</script>

<template>
  <svg :width="width" :height="height" style="background-color: black;">
    <g v-bind="figure({ x: width / 2, y: height / 2 })">
      <slot />
    </g>
  </svg>
</template>
