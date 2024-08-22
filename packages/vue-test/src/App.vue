<script setup lang="ts">
import { usePlayer } from '@suaterjs/vue-core'
import { Car, Rect, Arc, Polygon, Group } from '@suaterjs/vue-lib'
import { MathFunction, NumberAxis } from '@suaterjs/vue-math'

// const { widget } = useWidget()
const player = usePlayer()
player.play()

</script>

<template>
  <Car :width="1600" :height="800">
    <Group>
      <Rect :width="300" :height="300" :x="200" :y="200">
      </Rect>
      <Arc :radius="100" />
      <Polygon :points="[[100, 100], [200, 200], [300, 100]]" />
      <MathFunction :fn="Math.sin" :domain="[-3, 3]"/>
      <NumberAxis :range="[-3, 3]"/>
    </Group>
  </Car>
</template>

<style scoped></style>
