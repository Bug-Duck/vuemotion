<template>
  <g :tranform="`translate(${props.x ?? 0},${props.y ?? 0}) scale(${props.scaleX ?? 1},${props.scaleY ?? 1} rotate(${props.rotation ?? 0})`">
    <slot></slot>
  </g>
</template>

<script setup lang="ts">
import { BaseWidgetOptions } from './base-widget'

const props = defineProps<BaseWidgetOptions>()
</script>
