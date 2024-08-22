<script setup lang="ts">
import { useOptions } from '@vuemotion/vue-core';
import BaseWidget from './base-widget.vue';
import { LineOptions } from './line';

const props = useOptions<LineOptions>()
</script>

<template>
  <BaseWidget :scaleX="props.scaleX" :scaleY="props.scaleY" :rotation="props.rotation" :x="props.x" :y="props.y">
    <line :x1="props.from[0]" :y1="props.from[1]" :x2="props.to[0]" :y2="props.to[1]"
      :fill="props.fill ?? 'rgba(135,206,250,0.5)'" :stroke="props.border ?? 'rgba(135,206,250,1)'"
      :stroke-width="props.borderWidth ?? '5'"></line>
  </BaseWidget>
</template>
