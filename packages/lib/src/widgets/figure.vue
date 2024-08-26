<script setup lang="ts">
import { defineWidget } from '@vuemotion/core'
import type { Figure } from './defines'
import { FigureDefaults } from './defines'
import Super from './widget.vue'

const props = withDefaults(defineProps<Figure>(), FigureDefaults)
const options = defineWidget(props)
</script>

<template>
  <Super v-slot="slotProps" v-bind="options">
    <slot
      v-bind="slotProps"
      :fill="options.fillColor"
      :stroke="options.borderColor"
      :stroke-width="options.borderWidth"
      :stroke-dashoffset="options.borderOffset"
      :stroke-dasharray="options.borderInterval.join(' ')"
    />
  </Super>
</template>
