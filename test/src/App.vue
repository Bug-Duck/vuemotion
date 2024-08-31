<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core';
import { Motion, Text } from '@vue-motion/lib'

const player = usePlayer()
player.play()

const text1 = useWidget('text1')
const text2 = useWidget('text2')
</script>

<template>
  <Motion :width="900" :height="600" id="motion">
    <!-- <RouterView /> -->
    <Text :x="-100" wid="text1">Hello</Text>
    <Text :x="100" wid="text2">WORLD</Text>
  </Motion>
</template>
