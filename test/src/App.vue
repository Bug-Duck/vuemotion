<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core';
import { TextOptions } from '@vue-motion/lib';
import { fadeIn, Motion, Text } from '@vue-motion/lib'
import { onMounted } from 'vue';

// player.play()

const text1 = useWidget<TextOptions>('text1')
// const text2 = useWidget('text2')

onMounted(async () => {
  const player = usePlayer()
  player.useAnimation(text1).animate(fadeIn, { duration: 2, from: 0, to: 1 })
  // player.play()
})
</script>
<template>
  <Motion :width="900" :height="600" id="motion">
    <!-- <RouterView /> -->
    <Text :x="-100" wid="text1">Hello</Text>
    <Text :x="100" wid="text2">WORLD</Text>
  </Motion>
</template>
