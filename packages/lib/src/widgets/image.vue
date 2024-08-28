<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { FigureOptions } from './figure'
import { figure } from './figure'

export interface ImageOptions extends FigureOptions {
  href: string
  width: number
  height: number
  preserveAspectRatio?: string
}

const props = defineProps<ImageOptions>()
const options = defineWidget(props)
</script>

<template>
  <image
    v-bind="figure(options)"
    :href="options.href"
    :width="options.width"
    :height="options.height"

    :preserveAspectRatio="options.preserveAspectRatio"
  />
</template>
