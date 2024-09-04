<script setup lang="ts">
import { defineWidget } from '@vue-motion/core';
import { figure, FigureOptions } from '@vue-motion/lib'
import { computed, useSlots } from 'vue'
import { mathjax } from 'mathjax-full/js/mathjax';
import { TeX } from 'mathjax-full/js/input/tex';
import { SVG } from 'mathjax-full/js/output/svg';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html';

export interface TexOptions extends FigureOptions {
  // katexOptions: katex.KatexOptions
}

const props = defineProps<TexOptions>()
const options = defineWidget<TexOptions>(props)

// Create an adaptor for handling HTML elements
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

// Configure input (TeX) and output (SVG)
const tex = new TeX({});
const svg = new SVG({
  fontCache: 'none', // Disable font caching for simplicity
});

// Initialize MathJax with the configuration
const html = mathjax.document('', {
  InputJax: tex,
  OutputJax: svg,
});

/**
 * Converts a LaTeX expression to an SVG string.
 * @param {string} latex - The LaTeX string to convert.
 * @returns {string} - The rendered SVG string.
 */
function tex2svg(latex: string): string {
  // Create a document fragment containing the math
  const node = html.convert(latex, { display: true });
  // Extract and return the outer SVG as a string
  return adaptor.outerHTML(node);
}


const content = computed(() => {
  const slots = useSlots()
  return tex2svg(slots.default ? slots.default().map(vnode => vnode.children).join('') : '').match(/<svg.*?>([\s\S]*)<\/svg>/)?.[1] || ''
})

console.log(content.value)
</script>

<template>
  <g v-bind="figure(options)" v-html="content">

  </g>
</template>
