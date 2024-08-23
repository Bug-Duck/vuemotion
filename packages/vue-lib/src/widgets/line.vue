<script setup lang="ts">
import { defineWidget } from '@vuemotion/vue-core';
import BaseWidget from './base-widget.vue';
import { LineOptions } from './line';
import { defineProps } from 'vue'

const props = defineProps<LineOptions>()
const options = defineWidget<LineOptions>(props)
</script>

<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y">
    <line :x1="options.from[0]" :y1="options.from[1]" :x2="options.to[0]" :y2="options.to[1]"
      :fill="options.fill ?? 'rgba(135,206,250,0.5)'" :stroke="options.border ?? 'rgba(135,206,250,1)'"
      :stroke-width="options.borderWidth ?? '5'" :stroke-dashoffset="options.offset ?? 0" :stroke-dasharray="(options.interval ?? [1, 0]).join(' ')"></line>
  </BaseWidget>
</template>
