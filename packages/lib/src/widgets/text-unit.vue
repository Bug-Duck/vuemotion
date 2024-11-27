<script setup lang="ts">
import { defineProps } from 'vue'
import { defineWidget } from '@vue-motion/core'
import type { TextOptions } from './text.vue'
import { figure } from './figure'

const props = defineProps<TextOptions>()
const options = defineWidget<TextOptions>(props)
</script>

<template>
  <tspan
    v-bind="figure(options)" :font-family="options.fontFamily" :font-size="options.fontSize"
    :font-weight="options.fontWeight" :font-style="options.fontStyle" :text-anchor="options.align"
    :dominant-baseline="options.align" :text-decoration="options.decoration" :word-spacing="options.wordSpacing"
    :letter-spacing="options.letterSpacing"
  >
    <slot />
  </tspan>
</template>
