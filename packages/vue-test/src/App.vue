<script setup lang="ts">
import {useAnimation, usePlayer, useWidget} from '@vuemotion/vue-core'
import {Car, Arc, move, create} from '@vuemotion/vue-lib'
import { onMounted } from 'vue';

const { widget, props } = useWidget()

onMounted(() => {
  const player = usePlayer()
  useAnimation(props, player).animate(create({ duration: 1 }))
  player.play()
})

</script>

<template>
  <Car :width="1600" :height="800">
    <Arc :radius="100" ref="widget"/>
  </Car>
</template>

<style scoped></style>
