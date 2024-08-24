<script setup lang="ts">
import { defineWidget } from '@vuemotion/vue-core';
import { TextOptions } from './text'
import BaseWidget from './base-widget.vue';

const props = defineProps<TextOptions>()
const options = defineWidget<TextOptions>(props)
</script>

<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y">
    <text :font-size="options.fontSize ?? 50" :font-family="options.fontFamily ?? 'mono'"
      :fill="options.fill ?? 'white'" :stroke="options.border ?? 'white'"
      :stroke-width="options.borderWidth ?? '3'" :stroke-dashoffset="options.offset ?? 0"
      :stroke-dasharray="(options.interval ?? [1, 0]).join(' ')"
      :text-anchor="options.align ?? 'middle'" :dominant-baseline="options.baseline ?? 'middle'"
      :style="{ opacity: options.opacity ?? 1 }" transform="scale(1,-1)"
      :text-decoration="options.fontDecoration ?? 'nond'" :font-decoration="options.fontDecoration ?? 'none'"
      :font-weight="options.fontWeight ?? 'normal'" :word-spacing="options.wordSpacing ?? 0" :letter-spacing="options.letterSpacing ?? 0"
    ><slot></slot></text>
  </BaseWidget>
</template>
