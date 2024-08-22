<script setup lang="ts">
import { usePlayer, useWidget } from '@vuemotion/vue-core'
import { Car, Arc } from '@vuemotion/vue-lib'
import { nextTick, onMounted } from 'vue';

const { widget, props } = useWidget()
const player = usePlayer()
player.play()

onMounted(() => {
  nextTick(() => {
    console.log(props)
  })
})

</script>

<template>
  <Car :width="1600" :height="800">
    <Arc :radius="100" ref="widget"/>
  </Car>
</template>

<style scoped></style>
