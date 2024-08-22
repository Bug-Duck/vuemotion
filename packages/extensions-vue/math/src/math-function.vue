<template>
  <BaseWidget :scaleX="props.scaleX" :scaleY="props.scaleY" :rotation="props.rotation" :x="props.x" :y="props.y">
    <path :d="path" :stroke="props.color ?? 'rgba(135,206,250,1)'"
    :stroke-width="props.width ?? '5'">
  </path>
  </BaseWidget>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { MathFunctionOptions } from './math-function'
import { BaseWidget } from '@suaterjs/vue-lib';

function mathFunctionToSVGPath(mathFunc: (x: number) => number, xRange: [number, number], step = 0.1, divisionX = 50, divisionY = 50) {
  let path = '';
  let firstPoint = true;

  for (let x = xRange[0]; x <= xRange[1]; x += step) {
    const y = mathFunc(x);

    const svgX = x * divisionX + 200
    const svgY = -y * divisionY + 200

    if (firstPoint) {
      path += `M ${svgX} ${svgY}`;
      firstPoint = false;
    } else {
      path += ` L ${svgX} ${svgY}`;
    }
  }

  return path;
}

const props = defineProps<MathFunctionOptions>()

let path = mathFunctionToSVGPath(props.fn, props.domain, 0.1, props.divisionX, props.divisionY)
watch(props, () => {
  path = mathFunctionToSVGPath(props.fn, props.domain, 0.1, props.divisionX, props.divisionY)
})
</script>