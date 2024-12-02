<script setup lang="ts">
import { defineProps } from "vue";
import { defineWidget } from "@vue-motion/core";

import type { FigureIns, FigureOptions } from "./figure";
import { figure } from "./figure";

export interface TextOptions extends FigureOptions {
  fontFamily?: string;
  fontSize?:
    | "xx-small"
    | "x-small"
    | "small"
    | "medium"
    | "large"
    | "x-large"
    | "xx-large"
    | "xxx-large"
    | "larger"
    | "smaller"
    | string
    | (number & {});
  fontWeight?: number | "normal" | "bold" | "bolder" | "lighter";
  fontStyle?: "normal" | "italic" | "oblique";
  align?: "start" | "middle" | "end";
  baseline?: "top" | "middle" | "bottom";
  decoration?: "none" | "underline" | "overline" | "line-through" | "blink";
  wordSpacing?: number;
  letterSpacing?: number;
}
export type TextIns = TextOptions & FigureIns;

const props = withDefaults(defineProps<TextOptions>(), {
  borderColor: "none",
  fillColor: "white",
  align: "middle",
  baseline: "middle",
});
const options = defineWidget(props);
</script>

<template>
  <text
    v-bind="figure(options)"
    :font-family="options.fontFamily"
    :font-size="options.fontSize"
    :font-weight="options.fontWeight"
    :font-style="options.fontStyle"
    :text-anchor="options.align"
    :dominant-baseline="options.align"
    :text-decoration="options.decoration"
    :word-spacing="options.wordSpacing"
    :letter-spacing="options.letterSpacing"
  >
    <slot />
  </text>
</template>
