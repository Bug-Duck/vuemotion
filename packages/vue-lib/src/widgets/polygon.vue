<template>
  <BaseWidget :scaleX="props.scaleX" :scaleY="props.scaleY" :rotation="props.rotation" :x="props.x" :y="props.y">
    <polygon
      :points="props.points.map(p => `${p[0]},${p[1]}`).join(' ')"
      :fill="props.fill ?? 'rgba(135,206,250,0.5)'"
      :stroke="props.border ?? 'rgba(135,206,250,1)'"
      :stroke-width="props.borderWidth ?? '5'"
    >
      <slot></slot>
    </polygon>
  </BaseWidget>
</template>

<script setup lang="ts">
import { PolygonOptions } from './polygon'
import BaseWidget from './base-widget.vue';

const props = defineProps<PolygonOptions>()
</script>
