<script setup lang="ts">
import { defineWidget } from '@vue-motion/core';
import { widget, WidgetOptions } from './widget';

export interface WebViewOptions extends WidgetOptions {
  width?: number
  height?: number
}

const props = defineProps<WebViewOptions>()
const options = defineWidget<WebViewOptions>(props)
</script>

<template>
  <g v-bind="widget(options)">
    <foreignObject :width="options.width" :height="options.height" >
      <div :style="{
        color: 'white'
      }" xmlns="http://www.w3.org/1999/xhtml">
        <slot></slot>
      </div>
    </foreignObject>
  </g>
</template>
