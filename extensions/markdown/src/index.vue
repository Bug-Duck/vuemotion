<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import { type WidgetOptions, figure } from '@vue-motion/lib'
import { marked } from 'marked'
import { computed, onUpdated, ref, useSlots } from 'vue'

export interface MarkdownOptions extends WidgetOptions {
  autoCenter: boolean
}

const props = defineProps<MarkdownOptions>()
const options = defineWidget<MarkdownOptions>(props)

const slots = useSlots()
const md = ref(slots.default ? slots.default().map(vnode => vnode.children).join('') : '')

onUpdated(() => {
  const slots = useSlots()
  md.value = slots.default ? slots.default().map(vnode => vnode.children).join('') : ''
})

const content = computed(() => {
  return marked(md.value)
})
</script>

<template>
  <g v-bind="figure(options)">
    <foreignObject x="20" y="20" width="160" height="160">
      <!--
      In the context of SVG embeded into HTML, the XHTML namespace could
      be avoided, but it is mandatory in the context of an SVG document
    -->
      <div
        xmlns="http://www.w3.org/1999/xhtml" style="color: white;" :style="options.autoCenter ? {
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'height': '100%',
        } : undefined" v-html="content"
      />
    </foreignObject>
  </g>
</template>
