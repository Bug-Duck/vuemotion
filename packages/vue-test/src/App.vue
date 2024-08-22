<script setup lang="ts">
import { useAnimation, usePlayer, useWidget } from '@vuemotion/vue-core'
import { Unit } from '@vuemotion/extension-mindmap'
import { Car, Arc } from '@vuemotion/vue-lib'
import { onMounted } from 'vue';

const { widget, props } = useWidget()
useAnimation(props)
const player = usePlayer()
player.play()

onMounted(() => {
  (widget).value
})

</script>

<template>
  <Car :width="1600" :height="800">
    <Arc :radius="100" ref="widget"/>
    <Unit>
      <Arc :radius="200"></Arc>
    </Unit>
  </Car>
</template>

<style scoped></style>
