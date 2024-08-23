<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y">
    <polygon
      :points="options.points.map(p => `${p[0]},${p[1]}`).join(' ')"
      :fill="options.fill ?? 'rgba(135,206,250,0.5)'"
      :stroke="options.border ?? 'rgba(135,206,250,1)'"
      :stroke-width="options.borderWidth ?? '5'"
      :stroke-dashoffset="options.offset ?? 0"
      :stroke-dasharray="(options.interval ?? [1, 0]).join(' ')"
    >
      <slot></slot>
    </polygon>
  </BaseWidget>
</template>

<script setup lang="ts">
import { PolygonOptions } from './polygon'
import BaseWidget from './base-widget.vue';
import { useOptions } from '@vuemotion/vue-core';
import { defineProps } from 'vue'

const props = defineProps<PolygonOptions>()
const options = useOptions<PolygonOptions>(props)
</script>
