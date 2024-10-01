<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { WidgetOptions } from '@vue-motion/lib'
import { useSlots } from 'vue'

export interface ContainerOptions extends WidgetOptions {
  margin?: number
  marginX?: number
  marginY?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  padding?: number
  paddingX?: number
  paddingY?: number
  paddingTop?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
  width?: number
  height?: number
}

const props = defineProps<ContainerOptions>()
const options = defineWidget<ContainerOptions>(props)
</script>

<template>
  <svg
    :width="options.width ?? "
  ></svg>
</template>
