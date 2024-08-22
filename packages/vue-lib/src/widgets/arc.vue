<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y">
    <path :d="path" :fill="options.fill ?? 'rgba(135,206,250,0.5)'" :stroke="options.border ?? 'rgba(135,206,250,1)'"
    :stroke-width="options.borderWidth ?? '5'" />
  </BaseWidget>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, defineProps } from 'vue';
import { ArcOptions } from './arc'
import BaseWidget from './base-widget.vue';
import { useOptions } from '@vuemotion/vue-core';

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): { x: number; y: number } {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

const props = defineProps<ArcOptions>()
const options = useOptions<ArcOptions>(props)

let path = ref(describeArc(props.x ?? 0, props.y ?? 0, props.radius, props.from || 0, props.to || 359))

watch(props, () => {
  path = ref(describeArc(props.x ?? 0, props.y ?? 0, props.radius, props.from || 0, props.to || 359))
})
</script>
