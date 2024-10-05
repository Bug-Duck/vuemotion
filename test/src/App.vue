<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core'
import { Group, Motion, flash, grow, indicate, rotate, showCircleCreationThenDestructionAround } from '@vue-motion/lib'
import { onMounted } from 'vue'
import { MathFunction } from '@vue-motion/extension-math'
import { NumberPlane, PolarPlane } from '@vue-motion/extension-math'
import { Column, Container, Row } from '@vue-motion/extension-layout'

const plane = useWidget<InstanceType<typeof PolarPlane>>('plane')
const plane2 = useWidget<InstanceType<typeof PolarPlane>>('plane2')
const plane3 = useWidget<InstanceType<typeof PolarPlane>>('plane3')
const plane4 = useWidget<InstanceType<typeof PolarPlane>>('plane4')

onMounted(() => {
  const { play, useAnimation } = usePlayer()

  useAnimation(plane)
    .animate(rotate, { duration: 10, offset: -1000 })
  useAnimation(plane4)
    .animate(rotate, { duration: 10, offset: 1000 })
  useAnimation(plane2)
    .animate(rotate, { duration: 10, offset: -1000 })
  useAnimation(plane3)
    .animate(rotate, { duration: 10, offset: 1000 })

  play()
})
</script>

<template>
  <Motion id="motion" :width="1600" :height="900">
    <!--    <Group> -->
    <!--      <NumberPlane :ranges-x="[-5, 5]" :ranges-y="[-5, 5]" :grid="false"/> -->
    <!--      <MathFunction :fn="(x) => Math.sin(x)" color="skyblue" :domain="[0, 0]" :ranges="[0, 5]" wid="fn1" /> -->
    <!--      <MathFunction :fn="(x) => Math.cos(x)" color="red" :domain="[0, 0]" :ranges="[0, 5]" wid="fn2" /> -->
    <!--      <MathFunction :fn="(x) => Math.tan(x)" color="green" :domain="[0, 0]" :ranges="[0, 5]" wid="fn3" /> -->
    <!--    </Group> -->
    <PolarPlane :radius="300" wid="plane" />
    <NumberPlane :ranges-x="[-4, 4]" :ranges-y="[-4, 4]" wid="plane2" />
    <NumberPlane :ranges-x="[-6, 6]" :ranges-y="[-6, 6]" wid="plane3" />
    <PolarPlane :radius="500" wid="plane4" />
  </Motion>
</template>
