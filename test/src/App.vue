<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core'
import { Group, Motion, grow } from '@vue-motion/lib'
import { onMounted } from 'vue'
import { MathFunction, NumberPlane } from '@vue-motion/extension-math'

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
  <Motion id="motion" :width="2000" :height="1000">
    <Group>
      <NumberPlane :ranges-x="[-5, 5]" :ranges-y="[-5, 5]" />
      <MathFunction :fn="(x) => Math.sin(x)" color="skyblue" :domain="[-5, 5]" :ranges="[-1, 1]" wid="fn1" />
      <MathFunction :fn="(x) => Math.cos(x)" color="red" :domain="[-5, 5]" :ranges="[-1, 1]" wid="fn2" />
      <MathFunction :fn="(x) => Math.tan(x)" color="green" :domain="[-5, 5]" :ranges="[-1, 1]" wid="fn3" />
    </Group>
  </Motion>
</template>
