<script setup lang="ts">
import { Arc } from '@vue-motion/lib'
import { useMotion } from '@vue-motion/core'

const motion = useMotion()
motion.width.value = 1600
motion.height.value = 900
</script>

<template>
  <Arc :radius="100" />
</template>
