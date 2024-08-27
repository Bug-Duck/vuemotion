<script setup lang="ts">
import { defineWidget } from '@vuemotion/core'
import { Widget as Super } from '@vuemotion/lib';
import type { WindowOptions } from './window'

const props = withDefaults(defineProps<WindowOptions>(), {})
const options = defineWidget(props)
</script>

<template>
  <Super v-bind="options">
    <rect
      :x="-options.width / 2" :y="-options.height / 2" :width="options.width" :height="options.height"
      :fill="(options.theme ?? 'dark') === 'light' ? 'white' : 'gray'" rx="10" ry="10"
    />
    <rect
      :x="-(options.width - 20) / 2" :y="-(options.height - 100) / 2 - 40" :width="options.width - 20"
      :height="options.height - 40" :fill="(options.theme ?? 'dark') === 'light' ? 'white' : '#333333'" rx="10"
      ry="10"
    />
    <g :x="-(options.width - 20) / 2" :y="-(options.height - 100) / 2 - 40">
      <slot />
    </g>
    <circle r="10" :cx="-(options.width - 20) / 2 + 10" :cy="(options.height - 100) / 2 + 35" fill="red" />
    <circle r="10" :cx="-(options.width - 20) / 2 + 40" :cy="(options.height - 100) / 2 + 35" fill="yellow" />
    <circle r="10" :cx="-(options.width - 20) / 2 + 70" :cy="(options.height - 100) / 2 + 35" fill="lightgreen" />
  </Super>
</template>
