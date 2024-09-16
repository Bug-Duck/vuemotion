<script setup lang="ts">
import { usePlayer } from '@vue-motion/core'
import { Motion } from '@vue-motion/lib'
import { onMounted } from 'vue'
import { Tex } from '@vue-motion/extension-math'
import { PointLight } from '@vue-motion/extension-lights'

onMounted(() => {
  const player = usePlayer()
  player.play()
})
</script>

<template>
  <Motion id="motion" :width="900" :height="600">
    <!-- <Typst>Hello World</Typst> -->
    <PointLight type="diffuse" :x="0" :y="0" :z="0" :constant="0.5" color="blue">
      <Tex :katex-options="{}">
        c=\sqrt{a^2 + b^2}
      </Tex>
    </PointLight>
  </Motion>
</template>
