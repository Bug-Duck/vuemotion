<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { WidgetMixin, WidgetOptions } from './widget'
import { widget } from './widget'

export interface WebViewOptions extends WidgetOptions {
  width?: number
  height?: number
}
export type WebViewMixin = WebViewOptions & WidgetMixin

const props = defineProps<WebViewOptions>()
const options = defineWidget<WebViewOptions>(props)
</script>

<template>
  <g v-bind="widget(options)">
    <foreignObject :width="options.width" :height="options.height">
      <div
        :style="{
          color: 'white',
        }" xmlns="http://www.w3.org/1999/xhtml"
      >
        <slot />
      </div>
    </foreignObject>
  </g>
</template>
