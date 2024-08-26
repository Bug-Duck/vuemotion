<script setup lang="ts">
import type { Widget } from '@vuemotion/core'
import { defineWidget } from '@vuemotion/core'
import Super from './widget.vue'
import { WidgetDefaults } from './defines'

const props = withDefaults(defineProps<Widget>(), WidgetDefaults)
const options = defineWidget(props)
</script>

<template>
  <Super v-bind="options">
    <g>
      <slot />
    </g>
  </Super>
</template>
