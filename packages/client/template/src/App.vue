<script setup lang="ts">
import { useExporter, usePlayer } from '@vue-motion/core';
import { Motion } from '@vue-motion/lib'
import { onMounted } from 'vue';

onMounted(async () => {
  const player = usePlayer()
  const exporter = useExporter('#motion', player)
  const url = await exporter.exportToVideo(2, 16)
  console.log(url)
})
</script>

<template>
  <Motion :width="900" :height="600" id="motion">
    <RouterView />
  </Motion>
</template>
