<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { WidgetOptions } from '@vue-motion/lib'

export interface TableRowOptions extends WidgetOptions {
  height?: number
}

const props = defineProps<TableRowOptions>()
const options = defineWidget<TableRowOptions>(props)
</script>

<template>
  <td :style="{ height: `${options.height}px` ?? void 0 }">
    <slot />
  </td>
</template>
