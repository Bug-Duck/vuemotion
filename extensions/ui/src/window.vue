<script setup lang="ts">
import { defineWidget } from '@vuemotion/core'
import type { Grownable, WidgetOptions } from '@vuemotion/lib'
import { widget } from '@vuemotion/lib'

export interface WindowOptions extends WidgetOptions, Grownable {
  width: number
  height: number
  title?: string
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<WindowOptions>(), {})
const options = defineWidget(props)
</script>

<template>
  <g v-bind="widget(options)">
    <rect
      :x="-options.width / 2" :y="-options.height / 2" :width="options.width" :height="options.height"
      :fill="(options.theme ?? 'dark') === 'light' ? 'white' : 'gray'" rx="10" ry="10"
      stroke="none"
    />
    <rect
      :x="-(options.width - 20) / 2" :y="-(options.height - 100) / 2 - 40" :width="options.width - 20"
      :height="options.height - 40" :fill="(options.theme ?? 'dark') === 'light' ? 'white' : '#333333'" rx="10"
      ry="10" stroke="none"
    />
    <g :x="-(options.width - 20) / 2" :y="-(options.height - 100) / 2 - 40">
      <slot />
    </g>
    <circle r="10" :cx="-(options.width - 20) / 2 + 10" :cy="(options.height - 100) / 2 + 35" fill="red" stroke="none" />
    <circle r="10" :cx="-(options.width - 20) / 2 + 40" :cy="(options.height - 100) / 2 + 35" fill="yellow" stroke="none" />
    <circle r="10" :cx="-(options.width - 20) / 2 + 70" :cy="(options.height - 100) / 2 + 35" fill="lightgreen" stroke="none" />
  </g>
</template>
