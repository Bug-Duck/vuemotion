<script setup lang="ts">
import { useAnimation, usePlayer, useWidget } from '@vuemotion/vue-core'
import { Motion, Arc, stroke, create, strokeFill, focusOn, Text, rotate, TextItem, indicate, circleIndicate, Mask } from '@vuemotion/vue-lib'
import { onMounted } from 'vue'
// import { Angle, changeAngle } from '@vuemotion/extension-geometry'
// import { MDocument } from '@vuemotion/extension-markdown'

const props = useWidget('test')
const text = useWidget('text')
const angle = useWidget('angle')

onMounted(() => {
  const player = usePlayer()
  useAnimation(props, player)
    .animate(stroke({ duration: 1 }))
    .animate(create({ duration: 1 }))
    .animate(strokeFill({ duration: 1 }))
    .animate(focusOn({ duration: 0.8 }))
  useAnimation(text, player)
    .animate(stroke({ duration: 1 }))
    .animate(rotate({ duration: 1, offset: 360 }))
    .animate(indicate({ duration: 1 }))
    .animate(circleIndicate({ offset: 0.3, duration: 1 }))
  useAnimation(angle, player)
  // .animate(changeAngle({ duration: 1, offset: 300 }))
  player.play()
})

</script>

<template>
  <Motion :width="800" :height="450">
    <!-- <Angle :value="120" wid="angle"></Angle> -->
    <Mask :width="100" :height="200">
      <Text wid="text" align="middle" #content>
        wwwwwww
        <TextItem color="red">hhhhhh</TextItem>
      </Text>
      <Arc :radius="100" wid="test" :x="50" :y="100" #mask />
    </Mask>
    <Arc :radius="100" wid="test" :x="50" :y="100" #mask />
  </Motion>
</template>

<style scoped></style>
