<template>
  <BaseWidget :scaleX="props.scaleX" :scaleY="props.scaleY" :rotation="props.rotation" :x="props.x" :y="props.y">
    <path :d="path" :fill="props.fill ?? 'rgba(135,206,250,0.5)'" :stroke="props.border ?? 'rgba(135,206,250,1)'"
    :stroke-width="props.borderWidth ?? '5'" />
  </BaseWidget>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ArcOptions } from './arc'
import BaseWidget from './base-widget.vue';

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

let path = ref(describeArc(props.x ?? 0, props.y ?? 0, props.radius, props.from || 0, props.to || 359))

watch(props, () => {
  path = ref(describeArc(props.x ?? 0, props.y ?? 0, props.radius, props.from || 0, props.to || 359))
})
</script>
