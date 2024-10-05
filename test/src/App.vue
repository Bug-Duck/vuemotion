<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core'
import { Motion, grow } from '@vue-motion/lib'
import { onMounted } from 'vue'
import type { MathFunction } from '@vue-motion/extension-math'
import { BarChart, ChartData, ChartDataset } from '@vue-motion/extension-chart'

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
  <Motion id="motion" :width="1000" :height="1000">
    <!--    <Group> -->
    <!--      <NumberPlane :ranges-x="[-5, 5]" :ranges-y="[-5, 5]" :grid="false"/> -->
    <!--      <MathFunction :fn="(x) => Math.sin(x)" color="skyblue" :domain="[0, 0]" :ranges="[0, 5]" wid="fn1" /> -->
    <!--      <MathFunction :fn="(x) => Math.cos(x)" color="red" :domain="[0, 0]" :ranges="[0, 5]" wid="fn2" /> -->
    <!--      <MathFunction :fn="(x) => Math.tan(x)" color="green" :domain="[0, 0]" :ranges="[0, 5]" wid="fn3" /> -->
    <!--    </Group> -->
    <!--    <Group> -->
    <!--      <NumberPlane :ranges-x="[0, 10]" :ranges-y="[0, 10]" /> -->
    <!--    </Group> -->
    <BarChart :labels="['A', 'w', 'e', 'm']">
      <ChartDataset label="test1">
        <ChartData :cross="1" />
        <ChartData :cross="1" />
        <ChartData :cross="1" />
        <ChartData :cross="1" />
      </ChartDataset>
      <ChartDataset label="test2">
        <ChartData :cross="2" />
        <ChartData :cross="2" />
        <ChartData :cross="2" />
        <ChartData :cross="2" />
      </ChartDataset>
    </BarChart>
  </Motion>
</template>
