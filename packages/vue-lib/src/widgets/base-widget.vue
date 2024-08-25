<template>
  <g :tranform="`translate(${options.x ?? 0},${options.y ?? 0}) scale(${options.scaleX ?? 1},${options.scaleY ?? 1} rotate(${options.rotation ?? 0})`" ref="g" :style="{opacity: options.opacity ?? 1}" :mask="`url(#${id})`">
    <slot></slot>
  </g>
</template>

<script setup lang="ts">
import { defineWidget } from '@vuemotion/vue-core'
import { BaseWidgetOptions } from './base-widget'
import { defineProps, inject, onMounted, ref, watch, watchEffect } from 'vue'
import { nextTick } from 'vue';

const props = defineProps<BaseWidgetOptions>()
const options = defineWidget<BaseWidgetOptions>(props)

const g = ref<SVGGElement>(null)

function update() {
  g.value.setAttribute('transform', `translate(${options.x ?? 0},${options.y ?? 0}) scale(${options.scaleX ?? 1}, ${options.scaleY ?? 1}) rotate(${options.rotation ?? 0})`)
}

const id = inject('content_id') || 'none'

onMounted(update)

watch(options, update, { deep: true })
</script>
