<script setup lang="ts">
import { defineWidget, useMotion } from '@vue-motion/core'
import { type WidgetOptions, widget } from '@vue-motion/lib'

export interface RowOptions extends WidgetOptions {
  width: number
}

const props = defineProps<RowOptions>()

const { width, height } = useMotion()

const options = defineWidget<RowOptions>(props)
</script>

<template>
  <g v-bind="widget(options)">
    <foreignObject :width="options.width - (options.x ?? 0)" :height="height - (options.y ?? 0)">
      <div xmlns="http://www.w3.org/1999/xhtml">
        <slot />
      </div>
    </foreignObject>
  </g>
</template>
