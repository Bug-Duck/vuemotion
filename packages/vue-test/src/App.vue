<script setup lang="ts">
import { useAnimation, usePlayer, useWidget } from '@vuemotion/vue-core'
import { Car, Rect, Arc, Polygon, Group } from '@vuemotion/vue-lib'
import { MathFunction, NumberAxis } from '@vuemotion/vue-math'
import { onMounted } from 'vue';

const { widget, props } = useWidget()
useAnimation(props)
  .animate()
  .animate()
const player = usePlayer()
player.play()

onMounted(() => {
  props.height = 900
})

</script>

<template>
  <Car :width="1600" :height="800">
    <Group>
      <Rect :width="300" :height="300" :x="200" :y="200" ref="widget">
      </Rect>
      <Arc :radius="100" />
      <Polygon :points="[[100, 100], [200, 200], [300, 100]]" />
      <MathFunction :fn="Math.sin" :domain="[-3, 3]"/>
      <NumberAxis :range="[-3, 3]"/>
    </Group>
  </Car>
</template>

<style scoped></style>
