<script setup lang="ts">
import {useAnimation, usePlayer, useWidget} from '@vuemotion/vue-core'
import {Motion, Arc, stroke, create, Rect, strokeFill} from '@vuemotion/vue-lib'
import { onMounted } from 'vue';

const props = useWidget('test')

onMounted(() => {
  const player = usePlayer()
  useAnimation(props, player)
    .animate(stroke({ duration: 1 }))
    .animate(create({ duration: 1 }))
    .animate(strokeFill({ duration: 1 }))
  player.play()
})

</script>

<template>
  <Motion :width="800" :height="450">
    <Arc :radius="100" wid="test"/>
  </Motion>
</template>

<style scoped></style>
