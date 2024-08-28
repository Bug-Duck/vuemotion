<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { WidgetOptions } from './widget'
import { widget } from './widget'

const props = defineProps<WidgetOptions>()
const options = defineWidget(props)
</script>

<template>
  <g v-bind="widget(options)">
    <slot />
  </g>
</template>
