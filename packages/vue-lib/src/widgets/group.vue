<template>
  <g
    :transform="`translate(${props.x || 0}, ${props.y || 0}) scale(${props.scaleX ?? 1}, ${props.scaleY ?? 1}) rotate(${props.rotation ?? 0})`">
    <slot></slot>
  </g>
</template>

<script setup lang="ts">
import { useOptions } from '@vuemotion/vue-core';
import { GroupOptions } from './group'

const props = useOptions<GroupOptions>()
console.log(props)

</script>
