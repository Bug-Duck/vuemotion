<template>
  <svg :width="width" :height="height">
    <slot></slot>
  </svg>
</template>

<script setup lang="ts">
const { width, height } = defineProps<{
  width: number
  height: number
}>()
</script>
