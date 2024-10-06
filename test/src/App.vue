<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core'
import { Motion, grow } from '@vue-motion/lib'
import { onMounted } from 'vue'
import type { MathFunction } from '@vue-motion/extension-math'
import { BubbleChart, ChartData, ChartDataset, ChartUtil } from '@vue-motion/extension-chart'
import { DateTime, Duration } from 'luxon'

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
    <BubbleChart
      :labels="ChartUtil.dateSequence(
        DateTime.fromISO('2021-01-01').setLocale('en-US'),
        Duration.fromObject({ months: 4 }),
        'month',
        1,
      )"
    >
      <ChartDataset label="test1" :style="{ borderColor: '#f00', backgroundColor: '#f00' }">
        <ChartData :cross="1" />
        <ChartData :cross="2" />
        <ChartData :cross="0" />
        <ChartData :cross="1" />
      </ChartDataset>
      <ChartDataset label="test2" :style="{ borderColor: '#ff0', backgroundColor: '#ff0', borderRadius: 4, tension: 0.2 }">
        <ChartData :cross="2" />
        <ChartData :cross="1" />
        <ChartData :cross="3" />
        <ChartData :cross="2" />
        <ChartData :cross="1.5" :index="DateTime.fromISO('2021-03-15').setLocale('en-US')" :weight="10" />
      </ChartDataset>
    </BubbleChart>
  </Motion>
</template>
