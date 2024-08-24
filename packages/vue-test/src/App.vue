<script setup lang="ts">
import {useAnimation, usePlayer, useWidget} from '@vuemotion/vue-core'
import {Motion, Arc, stroke, create, Rect, strokeFill, focusOn, Text, rotate, TextItem, indicate, circleIndicate} from '@vuemotion/vue-lib'
import { onMounted } from 'vue';

const props = useWidget('test')
const text = useWidget('text')

onMounted(() => {
  const player = usePlayer()
  useAnimation(props, player)
    .animate(stroke({ duration: 1 }))
    .animate(create({ duration: 1 }))
    .animate(strokeFill({ duration: 1 }))
    .animate(focusOn({ duration: 0.8 }))
  useAnimation(text, player)
    .animate(stroke({ duration: 1 }))
    .animate(rotate({ duration:1, offset: 360 }))
    .animate(indicate({ duration: 1 }))
    .animate(circleIndicate({ offset: 0.3, duration: 1 }))
  player.play()
})

</script>

<template>
  <Motion :width="800" :height="450">
    <Arc :radius="100" wid="test" :x="50" :y="100"/>
    <Text wid="text" align="middle">
      wwwwwww
      <TextItem color="red">hhhhhh</TextItem>
    </Text>
  </Motion>
</template>

<style scoped></style>
