<template>
  <g
    :transform="`translate(${options.x || 0}, ${options.y || 0}) scale(${options.scaleX ?? 1}, ${options.scaleY ?? 1}) rotate(${options.rotation ?? 0})`" :style="{opacity: options.opacity ?? 1}">
    <slot></slot>
  </g>
</template>

<script setup lang="ts">
import { defineWidget } from '@vuemotion/vue-core';
import { GroupOptions } from './group'
import { defineProps } from 'vue'

const props = defineProps<GroupOptions>()
const options = defineWidget<GroupOptions>(props)
console.log(props)

</script>
