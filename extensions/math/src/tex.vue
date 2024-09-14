<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import { figure, FigureOptions } from '@vue-motion/lib'
import { computed, useSlots } from 'vue'
import katex from 'katex'

export interface TexOptions extends FigureOptions {
  katexOptions?: katex.KatexOptions
}

const props = defineProps<TexOptions>()
const options = defineWidget<TexOptions>(props)

const content = computed(() => {
  const slots = useSlots()
  const tex = slots.default ? slots.default().map(vnode => vnode.children).join('') : ''
  return katex.renderToString(tex, options.katexOptions).match(/<math.+>.+<\/math>/)![0]
})

</script>

<template>
  <g v-bind="figure(options)">
    <foreignObject x="20" y="20" width="160" height="160">
    <!--
      In the context of SVG embeded into HTML, the XHTML namespace could
      be avoided, but it is mandatory in the context of an SVG document
    -->
      <div xmlns="http://www.w3.org/1999/xhtml" style="color: white" v-html="content"></div>
    </foreignObject>
  </g>
</template>
