<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core'
import { Motion } from '@vue-motion/lib'
import { onMounted } from 'vue'
import { Typst } from '@vue-motion/extension-typst'

onMounted(() => {
  const player = usePlayer()
  player.play()
})
</script>
<template>
  <Motion :width="900" :height="600" id="motion">
    <Typst>Hello World</Typst>
  </Motion>
</template>
