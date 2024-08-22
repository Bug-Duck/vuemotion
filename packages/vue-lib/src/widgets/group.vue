<template>
  <g
    :transform="`translate(${options.x || 0}, ${options.y || 0}) scale(${options.scaleX ?? 1}, ${options.scaleY ?? 1}) rotate(${options.rotation ?? 0})`">
    <slot></slot>
  </g>
</template>

<script setup lang="ts">
import { useOptions } from '@vuemotion/vue-core';
import { GroupOptions } from './group'
import { defineProps } from 'vue'

const props = defineProps<GroupOptions>()
const options = useOptions<GroupOptions>(props)
console.log(props)

</script>
