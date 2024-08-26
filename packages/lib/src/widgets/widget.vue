<script setup lang="ts">
import type { Widget } from '@vuemotion/core'
import { defineWidget } from '@vuemotion/core'
import { WidgetDefaults } from './defines'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Widget>(), WidgetDefaults)
const options = defineWidget(props)
</script>

<template>
  <slot
    :transform="[
      `translate(${options.x ?? 0},${options.y ?? 0})`,
      `scale(${options.scaleX ?? 1}, ${options.scaleY ?? 1})`,
      `rotate(${options.rotation ?? 0})`,
    ].join(' ')"
    :style="{ opacity: options.opacity ?? 1 }"
  />
</template>
