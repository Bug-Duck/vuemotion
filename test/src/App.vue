<script setup lang="ts">
import { usePlayer } from '@vue-motion/core'
import { Motion } from '@vue-motion/lib'
import { onMounted } from 'vue'
import { Tex } from '@vue-motion/extension-math'

onMounted(() => {
  const player = usePlayer()
  player.play()
})
</script>

<template>
  <Motion id="motion" :width="900" :height="600">
    <!-- <Typst>Hello World</Typst> -->
    <Tex :katex-options="{}">
      c=\sqrt{a^2 + b^2}
    </Tex>
  </Motion>
</template>
