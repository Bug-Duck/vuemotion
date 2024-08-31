<script setup lang="ts">
import { Motion } from '@vue-motion/lib'
</script>

<template>
  <Motion :width="900" :height="600" id="motion">
    <RouterView />
  </Motion>
</template>
