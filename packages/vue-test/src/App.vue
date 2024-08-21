<script setup lang="ts">
import { usePlayer } from '@newcar-x/vue-core'
import { Car, Rect, Arc, Polygon, Group } from '@newcar-x/vue-lib'

// const { widget } = useWidget()
const player = usePlayer()
player.play()

</script>

<template>
  <Car :width="1600" :height="800">
    <Group :x="200" :y="1000">
      <Rect :width="300" :height="300" :x="200" :y="200">
      </Rect>
      <Arc :radius="100" />
      <Polygon :points="[[100, 100], [200, 200], [300, 100]]" />
    </Group>
  </Car>
</template>

<style scoped></style>
