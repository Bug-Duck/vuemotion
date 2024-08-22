<script setup lang="ts">
import {useAnimation, usePlayer, useWidget} from '@vuemotion/vue-core'
import {Car, Arc, move} from '@vuemotion/vue-lib'
import {inject, nextTick, onMounted, provide, ref} from 'vue';

const { widget, props } = useWidget()

onMounted(() => {
  const player = usePlayer()
  useAnimation(props, player).animate(move({duration: 1, offsetX: 100}))
  player.play()
})

</script>

<template>
  <Car :width="1600" :height="800">
    <Arc :radius="100" ref="widget"/>
  </Car>
</template>

<style scoped></style>
