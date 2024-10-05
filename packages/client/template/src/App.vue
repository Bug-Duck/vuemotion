<script setup lang="ts">
import { useMotion } from '@vue-motion/core'

const { width, height } = useMotion()
width.value = 1600
height.value = 900
</script>

<template>
  <RouterView />
</template>
