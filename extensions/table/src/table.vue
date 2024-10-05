<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { WidgetOptions } from '@vue-motion/lib'
import { widget } from '@vue-motion/lib'

export interface TableOptions extends WidgetOptions {
  width?: number
  height?: number
}

const props = defineProps<TableOptions>()
const options = defineWidget<TableOptions>(props)
</script>

<template>
  <g v-bind="widget(options)">
    <foreignObject :width="options.width" :height="options.height">
      <div
        :style="{
          color: 'white',
        }" xmlns="http://www.w3.org/1999/xhtml"
      >
        <table
          :style="{
            width: `${options.width}px` ?? void 0,
            height: `${options.height}px` ?? void 0,
            border: '3px solid white',
          }"
        >
          <slot />
        </table>
      </div>
    </foreignObject>
  </g>
</template>
