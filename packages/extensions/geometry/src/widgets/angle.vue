<script setup lang="ts">
import { defineWidget } from '@vuemotion/vue-core'
import { AngleOptions } from './angle'
import { Line, Arc, BaseWidget, Text, stroke } from '@vuemotion/vue-lib';
import { computed, ComputedRef } from 'vue';

const props = defineProps<AngleOptions>()
const options = defineWidget<AngleOptions>(props)

const textPosition = computed(() => {
  // Convert angles from degrees to radians
  const fromRad = ((options.from ?? 0) * Math.PI) / 180
  const toRad = (options.value * Math.PI) / 180

  // Calculate the middle angle in radians
  let midRad = (fromRad + toRad) / 2

  // Adjust if the angles are on opposite sides of the circle
  if (options.from > options.value) {
    midRad = (fromRad + (toRad + 2 * Math.PI)) / 2
  }

  // Calculate the coordinates of the midpoint
  const midX = (options.arcRadius ?? 50) * Math.cos(midRad)
  const midY = (options.arcRadius ?? 50) * Math.sin(midRad)

  return { x: midX, y: midY }
})
</script>

<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation">
    <Line :from="[0, 0]" :to="[options.fromSide ?? 150, 0]" :rotation="options.from ?? 0"
      :borderWidth="options.borderWidth || 5" />
    <Line :from="[0, 0]" :to="[options.endSide ?? 150, 0]" :rotation="options.value" :width="3"
      :borderWidth="options.borderWidth || 5" />
    <Arc :radius="options.arcRadius ?? 50" :from="(options.from ?? 0) + 90" :to="options.value + 90"
      :borderWidth="options.borderWidth || 3" :fill="`none`" />
    <Text :x="textPosition.x" :y="textPosition.y" stroke="none" fill="white" :fontSize="20">{{ options.value }}</Text>
  </BaseWidget>
</template>