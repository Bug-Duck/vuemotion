<!-- <script setup lang="ts">
import { defineProps } from "vue";
import { defineWidget } from "@vue-motion/core";
import { type WidgetOptions, widget } from "./widget";

export interface MaskOptions extends WidgetOptions {
  width: number;
  height: number;
}

const props = defineProps<MaskOptions>();
const options = defineWidget(props);

const id = props.wid || `mask-${Math.random().toString(36).substring(2, 9)}`;
</script>

<template>
  <mask
    :id="id"
    :x="options.x"
    :y="options.y"
    :width="options.width"
    :height="options.height"
  >
    <slot name="mask" />
  </mask>
  <g v-bind="widget(options)" :mask="`url(#${id})`">
    <slot name="target" />
  </g>
</template> -->
