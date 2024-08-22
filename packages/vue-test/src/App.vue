<script setup lang="ts">
import {useAnimation, usePlayer, useWidget} from '@vuemotion/vue-core'
import {Car, Arc, move} from '@vuemotion/vue-lib'
import {inject, nextTick, onMounted, provide, ref} from 'vue';

const { widget, props } = useWidget()
useAnimation(props)
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
<<<<<<< HEAD
    <Arc :radius="100" ref="widget"/>
    <Unit>
      <Arc :radius="200"></Arc>
    </Unit>
=======
    <Arc :radius="100" :x="500" ref="widget"/>
>>>>>>> 2d84aa8fa564515e1767bfa3bbacdbe550a478b6
  </Car>
</template>

<style scoped></style>
