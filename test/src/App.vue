<script setup lang="ts">
import { usePlayer, useWidget } from '@vuemotion/core'
import { Arc, Motion, Text, create, rotate } from '@vuemotion/lib'
import { Window } from '@vuemotion/extension-ui'
import { onMounted } from 'vue'
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
  player.play()
  const { exportToVideo } = useExporter('#motion', player)
  nextTick(async () => {
    const url = await exportToVideo(20, 60)
    console.log(url)
  })
})
</script>

<template>
  <Motion :width="640" :height="480" id="motion">
    <Window :width="600" :height="400">
      <Arc :radius="100" wid="arc" />
      <Text wid="text" font-size="50">
        vue
        <tspan fill="red">
          motion
        </tspan>
      </Text>
    </Window>
  </Motion>
</template>

<style scoped></style>
