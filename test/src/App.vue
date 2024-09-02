<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core';
import { rotate, TextOptions } from '@vue-motion/lib';
import { fadeIn, Motion, Text } from '@vue-motion/lib'
import { NumberAxis, NumberPlane, NumberPlaneOptions } from '@vue-motion/extension-math';
import { onMounted } from 'vue';

// player.play()

const text1 = useWidget<TextOptions>('text1')
const plane = useWidget<NumberPlaneOptions>('plane')
// const text2 = useWidget('text2')

onMounted(async () => {
  const player = usePlayer()
  player.useAnimation(text1).animate(fadeIn, { duration: 2, from: 0, to: 1 })
  // player.useAnimation(plane).animate(rotate, { duration: 4, offset: 720 })
  player.play()
})
</script>
<template>
  <Motion :width="900" :height="600" id="motion">
    <!-- <RouterView /> -->
    <Text :x="-100" wid="text1">Hello</Text>
    <Text :x="100" wid="text2">WORLD</Text>
    <!-- <NumberAxis :ranges="[-3, 2]"/> -->
    <NumberPlane :ranges-x="[-3, 3]" :ranges-y="[-2, 2]" wid="plane"></NumberPlane>
  </Motion>
</template>
