<script setup lang="ts">
import { defineWidget } from "@vue-motion/core";
import type { FigureOptions } from "@vue-motion/lib";
import { figure } from "@vue-motion/lib";
import { computed, onUpdated, ref, useSlots } from "vue";
import katex from "katex";

export interface TexOptions extends FigureOptions {
  katexOptions?: katex.KatexOptions;
  autoCenter?: boolean;
}

const props = defineProps<TexOptions>();
const options = defineWidget<TexOptions>(props);

const slots = useSlots();
const tex = ref(
  slots.default
    ? slots
        .default()
        .map((vnode) => vnode.children)
        .join("")
    : "",
);

onUpdated(() => {
  const slots = useSlots();
  tex.value = slots.default
    ? slots
        .default()
        .map((vnode) => vnode.children)
        .join("")
    : "";
});

const content = computed(() => {
  return `<div>${katex.renderToString(tex.value, options.katexOptions).match(/<math.[^\n\r>\u2028\u2029]*>.+<\/math>/)![0]}</div>`;
});
</script>

<template>
  <g v-bind="figure(options)">
    <foreignObject x="20" y="20" width="160" height="160">
      <!--
      In the context of SVG embeded into HTML, the XHTML namespace could
      be avoided, but it is mandatory in the context of an SVG document
    -->
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style="color: white"
        :style="
          options.autoCenter
            ? {
                display: 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                height: '100%',
              }
            : undefined
        "
        v-html="content"
      />
    </foreignObject>
  </g>
</template>
