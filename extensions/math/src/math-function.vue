<script setup lang="ts">
import { watch } from 'vue'
import { Widget } from '@vue-motion/lib'
import { defineWidget } from '@vue-motion/core'
import type { MathFunction } from './math-function'

export interface MathFunction extends Widget {
  fn: (x: number) => number
  domain: [number, number]
  range?: [number, number]
  divisionX?: number
  divisionY?: number
  color?: string
  width?: number
}

const props = defineProps<MathFunction>()
const options = defineWidget(props)

function mathFunctionToSVGPath(mathFunc: (x: number) => number, xRange: [number, number], step = 0.1, divisionX = 100, divisionY = 100) {
  let path = ''
  let firstPoint = true

  for (let x = xRange[0]; x <= xRange[1]; x += step) {
    const y = mathFunc(x)

    const svgX = x * divisionX + 200
    const svgY = -y * divisionY + 200

    if (firstPoint) {
      path += `M ${svgX} ${svgY}`
      firstPoint = false
    }
    else {
      path += ` L ${svgX} ${svgY}`
    }
  }

  return path
}

let path = mathFunctionToSVGPath(props.fn, props.domain, 0.1, props.divisionX, props.divisionY)
watch(props, () => {
  path = mathFunctionToSVGPath(props.fn, props.domain, 0.1, props.divisionX, props.divisionY)
})
</script>

<template>
  <Widget :scale-x="options.scaleX" :scale-y="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y">
    <path
      :d="path" :stroke="options.color ?? 'rgba(135,206,250,1)'"
      :stroke-width="options.width ?? '5'"
    />
  </Widget>
</template>
