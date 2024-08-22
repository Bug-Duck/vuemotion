<template>
  <g :tranform="`translate(${options.x ?? 0},${options.y ?? 0}) scale(${options.scaleX ?? 1},${options.scaleY ?? 1} rotate(${options.rotation ?? 0})`">
    <slot></slot>
  </g>
</template>

<script setup lang="ts">
import { useOptions } from '@vuemotion/vue-core'
import { BaseWidgetOptions } from './base-widget'
import { defineProps } from 'vue'

const props = defineProps<BaseWidgetOptions>()
const options = useOptions<BaseWidgetOptions>(props)
</script>
