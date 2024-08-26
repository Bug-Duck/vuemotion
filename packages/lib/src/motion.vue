<script setup lang="ts">
defineProps<{
  width: number
  height: number
}>()
</script>

<template>
  <svg :width="width" :height="height" style="background-color: black;">
    <g :transform="`translate(${width / 2}, ${height / 2})`">
      <slot />
    </g>
  </svg>
</template>
