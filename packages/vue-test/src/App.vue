<script setup lang="ts">
import { useAnimation, usePlayer, useWidget } from '@vuemotion/vue-core'
import { Motion, Arc, stroke, create, strokeFill, focusOn, Text, rotate, TextItem, indicate, circleIndicate, Mask, wiggle, flash } from '@vuemotion/vue-lib'
import { onMounted } from 'vue'
import { Window } from '@vuemotion/extension-ui'

const props = useWidget('test')
const text = useWidget('text')

onMounted(() => {
  const player = usePlayer()
  useAnimation(props, player)
    .animate(stroke({ duration: 1 }))
    .animate(create({ duration: 1 }))
    .animate(strokeFill({ duration: 1 }))
    .animate(focusOn({ duration: 0.8 }))
    .animate(flash({ duration: 1 }))
  useAnimation(text, player)
    .animate(stroke({ duration: 1 }))
    .animate(rotate({ duration: 1, offset: 360 }))
    .animate(indicate({ duration: 1 }))
    .animate(circleIndicate({ offset: 0.3, duration: 1 }))
    .animate(flash({ duration: 1 }))
  player.play()
})

</script>

<template>
  <Motion :width="800" :height="450">
    <Angle :value="120" wid="angle"></Angle>
    <Window :width="500" :height="300">
      <Text wid="text" align="middle">Hello world!</Text>
    </Window>
  </Motion>
</template>

<style scoped></style>
