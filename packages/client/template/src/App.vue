<script setup lang="ts">
import { Motion } from '@vue-motion/lib'
</script>

<template>
  <Motion id="motion" :width="900" :height="600">
    <RouterView />
  </Motion>
</template>
