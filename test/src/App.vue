<script setup lang="ts">
import { usePlayer, useWidget } from '@vuemotion/core'
import { Arc, Motion, Text, create, fadeOut, rotate, Image, Mask } from '@vuemotion/lib'
import { Window } from '@vuemotion/extension-ui'
import { onMounted, ref } from 'vue'
import { useExporter } from '@vuemotion/core'
import { nextTick } from 'vue'

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
  // .animate(fadeOut, { duration: 1 })
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
    <Window :width="600" :height="400">
      <Arc :radius="100" wid="arc" />
      <Text wid="text" font-size="50" v-if="display">
        vue
        <tspan fill="red">
          motion
        </tspan>
      </Text>
      <Mask id="mask">
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <path d="M10,35 A20,20,0,0,1,50,35 A20,20,0,0,1,90,35 Q90,65,50,95 Q10,65,10,35 Z" fill="black" />
      </Mask>
      <Image href="https://vuemotion.bugduck.org/logo.svg" :width="100" :height="100" mask="url(#mask)" />

    </Window>
  </Motion>
</template>

<style scoped></style>
