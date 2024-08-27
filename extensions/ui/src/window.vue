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

const props = withDefaults(defineProps<WindowOptions>(), {
  theme: 'dark',
})
const options = defineWidget(props)
</script>

<template>
  <g v-bind="widget(options)">
    <rect
      :x="-options.width / 2"
      :y="-options.height / 2"
      :width="options.width"
      :height="options.height"
      :fill="options.theme === 'light' ? 'white' : 'gray'"
      rx="10" ry="10" stroke="none"
    />
    <rect
      :x="10 - options.width / 2"
      :y="30 - options.height / 2"
      :width="options.width - 20"
      :height="options.height - 40"
      :fill="options.theme === 'light' ? 'white' : '#333333'"
      rx="10" ry="10" stroke="none"
    />
    <g
      :x="-(options.width - 20) / 2"
      :y="-(options.height - 100) / 2 - 40"
    >
      <slot />
    </g>
    <circle
      :cx="15 - options.width / 2" :cy="15 - options.height / 2"
      r="10" fill="red" stroke="none"
    />
    <circle
      :cx="40 - options.width / 2" :cy="15 - options.height / 2"
      r="10" fill="yellow" stroke="none"
    />
    <circle
      :cx="65 - options.width / 2" :cy="15 - options.height / 2"
      r="10" fill="lightgreen" stroke="none"
    />
  </g>
</template>
