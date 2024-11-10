<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FigureOptions, Growable } from '@vue-motion/lib'
import { Path, figure } from '@vue-motion/lib'
import { defineWidget } from '@vue-motion/core'
// import type { MathFunction } from './math-function'

export interface MathFunctionOptions extends FigureOptions, Growable {
  fn: (x: number) => number
  domain: [number, number]
  ranges?: [number, number]
  divisionX?: number
  divisionY?: number
  color?: string
  width?: number
  fillColor?: string
}

const props = defineProps<MathFunctionOptions>()
const options = defineWidget(props)

function generateSvgPath(mathFunc: (x: number) => number, domain: {
  x: [number, number]
  y: [number, number]
}, scaleX: number, scaleY: number) {
  const { x: [xMin, xMax], y: [yMax] } = domain
  const path = []
  const step = (xMax - xMin) / 500 // Set segmentation fineness

  for (let x = xMin; x <= xMax; x += step) {
    const y = mathFunc(x)
    
    // Convert the values of a mathematical function to SVG coordinates
    const svgX = (x - xMin) * scaleX
    const svgY = (yMax - y) * scaleY // Invert the y-axis to conform to the SVG coordinate system
    
    path.push(`${x === xMin || svgY > 1500 || svgY < -1500  ? 'M' : 'L'} ${svgX} ${svgY}`)   
  }

  return path.join(' ')
}

const path = ref('')

watch(props.fn, () => {
  path.value = generateSvgPath(options.fn, {
    x: options.domain,
    y: options.ranges ?? [0, 0],
  }, options.divisionX ?? 100, options.divisionY ?? 100)
}, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <g v-bind="figure(options)">
    <Path :d="path" :stroke="options.color ?? 'white'" :stroke-width="options.width" :fill-color="options.fillColor ?? 'none'" />
  </g>
</template>
