<script setup lang="ts">
import { BaseWidget, Rect } from '@vuemotion/vue-lib'
import { getCurrentInstance, onMounted, ref, Slot } from 'vue'
import { UnitOptions } from './unit'
import { useOptions } from '@vuemotion/vue-core'
import { isUnionTypeNode } from 'typescript';

const props = defineProps<UnitOptions>()
const options = useOptions<UnitOptions>(props)

const width = ref(null)
const height = ref(null)
onMounted(() => {
  const slot = getCurrentInstance().slots
  width.value = slot.value.getBoundingClientRect().width
  height.value = slot.value.getBoundingClientRect().height
})
</script>

<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y">
    <Rect :width="width" :height="height"></Rect>
    <slot></slot>
  </BaseWidget>
</template>