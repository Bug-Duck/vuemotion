<template>
  <BaseWidget :scaleX="props.scaleX" :scaleY="props.scaleY" :rotation="props.rotation" :x="props.x" :y="props.y">
    <!-- <line :x1="props.range[0] * interval" :x2="props.range[1] * interval" :y1="0" :y2="0" :stroke="props.trim ?? 'white'" :stroke-width="5"></line>
    <polygon points="15,0 0,20 0,-20" :fill="props.trim ?? 'white'" :transform="`translate(${props.range[1] * interval}, 0)`"></polygon>
    <line y1="5" y2="-5" v-for=""></line> -->
    <Line :from="[props.range[0] * interval, 0]" :to="[props.range[1] * interval, 0]" :stroke="props.trim ?? 'white'"/>
    <Polygon :points="[
      [15 + props.range[1] * interval, 0],
      [props.range[1] * interval, 20],
      [props.range[1] * interval, -20]
    ]" :fill="props.tip ?? 'white'" :border="props.tip ?? 'white'"/>
    <Line v-for="i in range(...props.range)" :from="[i * interval, 10]" :to="[i * interval, -10]"/>
  </BaseWidget>
</template>

<script setup lang="ts">
import { BaseWidget, Line, Polygon } from '@suaterjs/vue-lib';
import { NumberAxisOptions } from './number-axis'
const props = defineProps<NumberAxisOptions>()

const interval = props.interval ?? 50

function range(start: number, end: number, step = 1) {
  const array = [];
  for (let i = start; i < end; i += step) {
    array.push(i);
  }
  return array;
}
</script>