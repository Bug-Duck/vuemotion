<script setup lang="ts">
import {useAnimation, usePlayer, useWidget} from '@vuemotion/vue-core'
import {Car, Arc, move} from '@vuemotion/vue-lib'
import {inject, nextTick, onMounted, provide, ref} from 'vue';

const { widget, props } = useWidget()
const player = usePlayer()
player.play()

onMounted(() => {
  useAnimation(props, player).animate(move({duration: 1, offsetX: 100}))
  nextTick(() => {
    console.log(props)
    props.x = 100
  })
})

</script>

<template>
  <Car :width="1600" :height="800">
    <Arc :radius="100" :x="500" ref="widget"/>
  </Car>
</template>

<style scoped></style>
