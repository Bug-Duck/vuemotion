<template>
  <Text wid="text" font-size="50" border-color="white">Fuck the World!</Text>
</template>

<script setup lang="ts">
import { useWidget } from '@vuemotion/core';
import { usePlayer } from '@vuemotion/core';
import { circleIndicate } from '@vuemotion/lib';
import { focusOn, strokeFill } from '@vuemotion/lib';
import { TextOptions } from '@vuemotion/lib';
import { Text, indicate } from '@vuemotion/lib';
import { onMounted } from 'vue';

const text = useWidget<TextOptions>('text')

onMounted(() => {
  const player = usePlayer()
  player.useAnimation(text)
    .animate(circleIndicate, { duration: 1 })
  player.play()
})
</script>