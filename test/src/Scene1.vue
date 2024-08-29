<template>
  <Text wid="text" font-size="50" border-color="white">Fuck the World!</Text>
</template>

<script setup lang="ts">
import { useWidget } from '@vue-motion/core';
import { usePlayer } from '@vue-motion/core';
import { circleIndicate } from '@vue-motion/lib';
import { showCreationThenDestructionAround } from '@vue-motion/lib';
import { wiggle } from '@vue-motion/lib';
import { focusOn, strokeFill } from '@vue-motion/lib';
import { TextOptions } from '@vue-motion/lib';
import { Text, indicate } from '@vue-motion/lib';
import { onMounted } from 'vue';

const text = useWidget<TextOptions>('text')

onMounted(() => {
  const player = usePlayer()
  player.useAnimation(text)
    .animate(circleIndicate, { duration: 1 })
    .animate(wiggle, { duration: 1 })
    .animate(focusOn, { duration: 1 })
    .animate(showCreationThenDestructionAround, { duration: 1 })
  player.play()
})
</script>