<script setup lang="ts">
import Child from './Child.vue'
import { useWidget, usePlayer } from '@newcar-x/vue-core'
import { Car, Rect } from '@newcar-x/vue-lib'

const { widget } = useWidget()
const player = usePlayer()
player.play()

</script>

<template>
  <Car :width="1600" :height="800">
    <Rect :width="300" :height="300"></Rect>
  </Car>
</template>

<style scoped>

</style>
