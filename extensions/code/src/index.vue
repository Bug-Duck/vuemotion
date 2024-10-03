<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { WidgetOptions } from '@vue-motion/lib'
import { widget } from '@vue-motion/lib'
import type { CodeToHastOptions } from 'shiki'
import { codeToHtml } from 'shiki'
import { ref, useSlots } from 'vue'

export interface CodeOptions extends WidgetOptions {
  shikiOptions?: CodeToHastOptions
  lang: string
  theme: string
  width: number
  height: number
}

const props = defineProps<CodeOptions>()
const options = defineWidget<CodeOptions>(props)

const slots = useSlots()
const codes = slots.default ? slots.default().map(vnode => vnode.children).join('') : ''
const content = ref(await codeToHtml(codes, {
  ...options.shikiOptions,
  lang: options.lang,
  theme: options.theme,
}))
</script>

<template>
  <g v-bind="widget(options)">
    <foreignObject x="20" y="20" :width="options.width" :height="options.height">
      <!--
      In the context of SVG embeded into HTML, the XHTML namespace could
      be avoided, but it is mandatory in the context of an SVG document
    -->
      <div xmlns="http://www.w3.org/1999/xhtml" style="color: white" v-html="content" />
    </foreignObject>
  </g>
</template>
