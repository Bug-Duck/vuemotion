<template>
  <tspan :stroke="options.color ?? 'white'" :fill="options.color ?? 'white'" text-anchor="options.fontDecoration ?? 'start'" :font-family="options.fontFamily" :font-size="options.fontSize ?? 50" :font-weight="options.fontWeight ?? 'normal'">
    <slot></slot>
  </tspan>
</template>

<script setup lang="ts">
import { defineWidget } from '@vuemotion/vue-core';
import { TextItemOptions } from './text-item';

const props = defineProps<TextItemOptions>()
const options = defineWidget<TextItemOptions>(props)
</script>
