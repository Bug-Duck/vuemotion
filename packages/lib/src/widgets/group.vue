<script setup lang="ts">
import { defineWidget } from '@vuemotion/core'
import type { Widget } from './widget'
import { widget } from './widget'

const props = defineProps<Widget>()
const options = defineWidget(props)
</script>

<template>
  <g v-bind="widget(options)">
    <slot />
  </g>
</template>
