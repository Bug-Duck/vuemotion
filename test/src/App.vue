<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core'
import { Motion, Rect, type RectMixin } from '@vue-motion/lib'
import { onMounted } from 'vue'

const rect = useWidget<RectMixin>()

const { play } = usePlayer()

onMounted(() => {
  rect.move(100, 100)
  rect.rotate(180)
  rect.rotateTo(200)
  rect.zoomIn()
  rect.zoomOut()
  rect.zoomTo(3, 3)
  play()
})
</script>

<template>
  <Motion :width="1600" :height="900">
    <Rect :widget="rect" :width="100" :height="100" fill-color="red" />
  </Motion>
</template>
