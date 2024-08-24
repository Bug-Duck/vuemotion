<script setup lang="ts">
import { defineWidget } from '@vuemotion/vue-core';
import { WebviewOptions } from './webview';

const props = defineProps<WebviewOptions>()
const options = defineWidget<WebviewOptions>(props)
</script>

<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y">
    <foreignObject :width="options.width ?? Infinity" :height="options.height ?? Infinity">
      <slot></slot>
    </foreignObject>
  </BaseWidget>
</template>