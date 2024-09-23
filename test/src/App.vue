<script setup lang="ts">
import { usePlayer } from '@vue-motion/core'
import { Motion } from '@vue-motion/lib'
import { onMounted } from 'vue'
import { Tex } from '@vue-motion/extension-math'
import { PointLight } from '@vue-motion/extension-lights'
import { Cube, Three } from '@vue-motion/extension-three'
import { Dot } from '@vue-motion/extension-geometry'

onMounted(() => {
  const player = usePlayer()
  player.play()
})
</script>

<template>
  <Motion id="motion" :width="2000" :height="1000">
    <!-- <Typst>Hello World</Typst> -->
    <PointLight type="diffuse" :x="20" :y="20" :z="0.5" :constant="0.5" color="skyblue">
      <Tex
        :katex-options="{}"
        wid="www"
      >
        c=\sqrt{a^2 + b^2}
      </Tex>
      <!--      <Suspense> -->
      <!--        <Three :width="1000" :height="1000" :camera-config="{}" :x="-500" :y="-500"/> -->
      <!--      </Suspense> -->
    </PointLight>
    <!-- <Three :width="300" :height="300">
      <Cube :width="1" :height="1" :depth="1"/>
    </Three> -->
    <Dot />
  </Motion>
</template>
