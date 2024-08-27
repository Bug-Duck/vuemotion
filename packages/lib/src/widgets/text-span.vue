<script setup lang="ts">
import { defineProps } from 'vue'
import { defineWidget } from '@vuemotion/core'
import type { TextOptions } from './text'
import { text } from './text'

const props = defineProps<TextOptions>()
const options = defineWidget(props)
</script>

<template>
  <tspan v-bind="text(options)">
    <slot />
  </tspan>
</template>
