<script setup lang="ts">
import { defineProps, provide, ref } from 'vue'
import { figure } from './widgets/figure.ts'

const props = defineProps<{
  width: number
  height: number
  minWidth?: number
  minHeight?: number
  scale?: number
  backgroundColor?: string
}>()

const w = ref(props.width)
const h = ref(props.height)

provide('motion-width', w)
provide('motion-height', h)


</script>

<template>
  <svg
    :viewBox="`0 0 ${w} ${h}`" :style="{
      transform: `scale(${props.scale ?? 1})`,
      minWidth: `${props.minWidth ?? width}px`,
      minHeight: `${props.minHeight ?? height}px`,
      backgroundColor: props.backgroundColor ?? 'black'
    }" :width="w" :height="h"
  >
    <g v-bind="figure({ x: width / 2, y: height / 2 })">
      <slot />
    </g>
  </svg>
</template>
