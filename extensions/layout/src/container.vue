<script setup lang="ts">
import { defineWidget, useChildren } from '@vue-motion/core'
import type { WidgetOptions } from '@vue-motion/lib'
import type { ComputedRef } from 'vue'
import { computed, onMounted } from 'vue'

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

const children = useChildren()

let width: ComputedRef<number>
let height: ComputedRef<number>

onMounted(() => {
  width = computed(() => {
    if (options.width)
      return options.width
    const counter: number[] = []
    children.forEach((child) => {
      counter.push(Math.abs(child.range?.x ?? 0) + (child.range?.width ?? 0))
    })
    return Math.max(...counter)
  })
  height = computed(() => {
    if (options.height)
      return options.height
    const counter: number[] = []
    children.forEach((child) => {
      counter.push(Math.abs(child.range?.y ?? 0) + (child.range?.height ?? 0))
    })
    return Math.max(...counter)
  })
})

onMounted(() => {
  console.log(width.value, height.value)
})

const marginTop = computed(() => props.marginTop ?? props.marginY ?? props.margin ?? 0)
const marginBottom = computed(() => props.marginBottom ?? props.marginY ?? props.margin ?? 0)
const marginLeft = computed(() => props.marginLeft ?? props.marginX ?? props.margin ?? 0)
const marginRight = computed(() => props.marginRight ?? props.marginX ?? props.margin ?? 0)
const paddingTop = computed(() => props.paddingTop ?? props.paddingY ?? props.padding ?? 0)
const paddingBottom = computed(() => props.paddingBottom ?? props.paddingY ?? props.padding ?? 0)
const paddingLeft = computed(() => props.paddingLeft ?? props.paddingX ?? props.padding ?? 0)
const paddingRight = computed(() => props.paddingRight ?? props.paddingX ?? props.padding ?? 0)
</script>

<template>
  <svg
    :style="{
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      width,
      height,
    }"
  >
    <slot />
  </svg>
</template>
