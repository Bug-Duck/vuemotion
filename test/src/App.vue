<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core'
import { Group, Motion, grow } from '@vue-motion/lib'
import { onMounted } from 'vue'
import { MathFunction } from '@vue-motion/extension-math'
import { NumberPlane, PolarPlane } from '@vue-motion/extension-math'
import { Column, Container, Row } from '@vue-motion/extension-layout'

const fn1 = useWidget<InstanceType<typeof MathFunction>>('fn1')
const fn2 = useWidget<InstanceType<typeof MathFunction>>('fn2')
const fn3 = useWidget<InstanceType<typeof MathFunction>>('fn3')

onMounted(() => {
  const { play, useAnimation } = usePlayer()

  useAnimation(fn1)
    .animate(grow, { duration: 1 })
  useAnimation(fn2)
    .animate(grow, { duration: 1 })
  useAnimation(fn3)
    .animate(grow, { duration: 1 })

  play()
})
</script>

<template>
  <Motion id="motion" :width="1000" :height="3000">
    <!--    <Group> -->
    <!--      <NumberPlane :ranges-x="[-5, 5]" :ranges-y="[-5, 5]" :grid="false"/> -->
    <!--      <MathFunction :fn="(x) => Math.sin(x)" color="skyblue" :domain="[0, 0]" :ranges="[0, 5]" wid="fn1" /> -->
    <!--      <MathFunction :fn="(x) => Math.cos(x)" color="red" :domain="[0, 0]" :ranges="[0, 5]" wid="fn2" /> -->
    <!--      <MathFunction :fn="(x) => Math.tan(x)" color="green" :domain="[0, 0]" :ranges="[0, 5]" wid="fn3" /> -->
    <!--    </Group> -->
    <Group>
      <Column :height="6000">
        <Container>
          <PolarPlane :radius="300" />
        </Container>
        <Container>
          <PolarPlane :radius="300" />
        </Container>
        <!-- <Container>
          <PolarPlane :radius="300" />
        </Container>
        <Container>
          <PolarPlane :radius="300" />
        </Container> -->
      </Column>
    </Group>
  </Motion>
</template>
