<script setup lang="ts">
import { usePlayer, useWidget } from '@vuemotion/core'
import { Arc, Motion, Text, create, fadeOut, rotate } from '@vuemotion/lib'
import { onMounted, ref } from 'vue'

const arc = useWidget<InstanceType<typeof Arc>>('arc').props
const text = useWidget<InstanceType<typeof Text>>('text').props

onMounted(() => {
  const player = usePlayer()
  player.useAnimation(arc)
    .animate(create)
  player.useAnimation(text)
    .animate(rotate, { offset: 360 })
    .exec(() => {
      display.value = true
    })
    .delay(1)
    .animate(fadeOut, { duration: 1 })
  player.play()
  // const { exportToVideo } = useExporter('#motion', player)
  // nextTick(async () => {
  //   const url = await exportToVideo(20, 60)
  //   console.log(url)
  // })
})

const display = ref(false)
</script>

<template>
  <Motion :width="640" :height="480" id="motion">
    <RouterView></RouterView>
  </Motion>
</template>

<style scoped></style>
