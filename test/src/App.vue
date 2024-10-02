<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core'
import { Group, Motion, grow } from '@vue-motion/lib'
import { onMounted } from 'vue'
import { MathFunction, NumberPlane, PolarPlane } from '@vue-motion/extension-math'
import { Container, Row } from '@vue-motion/extension-layout'

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
  <Motion id="motion" :width="4000" :height="1000">
    <!--    <Group>-->
    <!--      <NumberPlane :ranges-x="[-5, 5]" :ranges-y="[-5, 5]" />-->
    <!--      <MathFunction :fn="(x) => Math.sin(x)" color="skyblue" :domain="[-5, 5]" :ranges="[-1, 1]" wid="fn1" />-->
    <!--      <MathFunction :fn="(x) => Math.cos(x)" color="red" :domain="[-5, 5]" :ranges="[-1, 1]" wid="fn2" />-->
    <!--      <MathFunction :fn="(x) => Math.tan(x)" color="green" :domain="[-5, 5]" :ranges="[-1, 1]" wid="fn3" />-->
    <!--    </Group>-->
    <Group>
      <Row :width="6000">
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
      </Row>
    </Group>
  </Motion>
</template>
