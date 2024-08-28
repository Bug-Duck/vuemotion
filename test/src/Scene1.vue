<template>
  <Text wid="text" font-size="100" border-color="white">Fuck the World!</Text>
</template>

<script setup lang="ts">
import { useWidget } from '@vuemotion/core';
import { usePlayer } from '@vuemotion/core';
import { strokeFill } from '@vuemotion/lib';
import { TextOptions } from '@vuemotion/lib';
import { Text, indicate } from '@vuemotion/lib';
import { onMounted } from 'vue';

const text = useWidget<TextOptions>('text')

onMounted(() => {
  const player = usePlayer()
  player.useAnimation(text)
    .animate(indicate, { duration: 1 })
    .animate(strokeFill, { duration: 2 })
  player.play()
})
</script>