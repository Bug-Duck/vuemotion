<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y">
    <path :d="path" :fill="options.fill ?? 'rgba(135,206,250,0.5)'" :stroke="options.border ?? 'rgba(135,206,250,1)'"
    :stroke-width="options.borderWidth ?? '5'" :stroke-dashoffset="options.offset ?? 0" :stroke-dasharray="(options.interval ?? [1, 0]).join(' ')" />
  </BaseWidget>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, defineProps, computed } from 'vue';
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

const path = computed(() => describeArc(options.x ?? 0, options.y ?? 0, options.radius, options.from ?? 0, (options.to ?? 359) * (options.progress ?? 1)))
</script>
