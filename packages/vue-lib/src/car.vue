<template>
  <svg :width="width" :height="height" style="background-color: black;">
    <g :transform="`translate(${width / 2}, ${height / 2}) scale(1, -1)`">
      <slot></slot>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { width, height } = defineProps<{
  width: number
  height: number
}>()
</script>
