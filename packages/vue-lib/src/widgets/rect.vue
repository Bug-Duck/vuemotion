<template>
  <BaseWidget :scaleX="props.scaleX" :scaleY="props.scaleY" :rotation="props.rotation" :x="props.x" :y="props.y">
    <rect
      :width="props.width"
      :height="props.height"
      :x="(-props.width / 2).toString()"
      :y="(-props.height / 2).toString()"
      :fill="props.fill ?? 'rgba(135,206,250,0.5)'"
      :stroke="props.border ?? 'rgba(135,206,250,1)'"
      :stroke-width="props.borderWidth ?? '5'"
    ></rect>
  </BaseWidget>
</template>

<script setup lang="ts">
import { useOptions } from '@vuemotion/vue-core';
import { default as BaseWidget } from './base-widget.vue'
import { FigureOptions } from './figure'
import { defineProps, onMounted, ref } from 'vue'

interface RectOptions extends FigureOptions {
  width: number
  height: number
  /**
   * The corner radius of the rectangle.
   * @default 0
   * @description
   * The corner radius can be a single number, in which case all corners will have the same radius.
   * It can also be an array of 2 numbers, in which case the first number will be the radius of the top-left and top-right corners, and the second number will be the radius of the bottom-left and bottom-right corners.
   * It can also be an array of 4 numbers, in which case the first number will be the radius of the top-left corner, the second number will be the radius of the top-right corner, the third number will be the radius of the bottom-right corner, and the fourth number will be the radius of the bottom-left corner.
   * It can also be an array of 8 numbers, in which case in order, the numbers will be radiusX, radiusY for upper-left, upper-right, lower-right, lower-left.
   */
  radius?: number
  | [number, number]
  | [number, number, number, number]
  | [number, number, number, number, number, number, number, number]
}

const props = useOptions<RectOptions>()
const rect = ref()
</script>
