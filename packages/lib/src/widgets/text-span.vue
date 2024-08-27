<script setup lang="ts">
import { defineProps } from 'vue'
import { defineWidget } from '@vuemotion/core'
import type { Text } from './text'
import { text } from './text'

const props = defineProps<Text>()
const options = defineWidget(props)
</script>

<template>
  <tspan v-bind="text(options)">
    <slot />
  </tspan>
</template>
