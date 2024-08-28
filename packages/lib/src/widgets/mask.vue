<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { WidgetOptions } from './widget'

export interface MaskOptions extends WidgetOptions {
  id: string
}

const props = defineProps<MaskOptions>()
const options = defineWidget(props)
</script>

<template>
  <defs>
    <mask :id="options.id">
      <slot />
    </mask>
  </defs>
</template>
