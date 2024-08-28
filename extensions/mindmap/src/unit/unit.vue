<script setup lang="ts">
import { Rect, Widget } from '@vue-motion/lib'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { defineWidget } from '@vue-motion/core'
import type { Unit } from './unit'

const props = defineProps<Unit>()
const options = defineWidget<Unit>(props)

const width = ref(null)
const height = ref(null)
onMounted(() => {
  const slot = getCurrentInstance().slots
  width.value = slot.value.getBoundingClientRect().width
  height.value = slot.value.getBoundingClientRect().height
})
</script>

<template>
  <Widget :scale-x="options.scaleX" :scale-y="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y">
    <Rect :width="width" :height="height" />
    <slot />
  </Widget>
</template>
