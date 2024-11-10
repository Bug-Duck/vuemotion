<script setup lang="ts">
import {Growable, WidgetOptions} from "@vue-motion/lib";
import { widget } from "@vue-motion/lib";

import { defineWidget } from "@vue-motion/core";
// import { computed } from "vue";

export interface EllipseOptions extends WidgetOptions, Growable {
  center: [number, number];
  a: number,
  b: number,
  wid: string,
  fillColor?: string
}

// const standardEquation = computed(() => {})
const props = defineProps<EllipseOptions>();
const options = defineWidget<EllipseOptions>(props);
</script>

<template>
  <g v-bind="widget(options)">
    <circle :id="options.wid" :cx="options.center[0]*100" :cy="options.center[1]*100" r="100" :fill="props.fillColor" stroke="none" :style="{ transform: `matrix(${options.a}, 0, 0, ${options.b}, 0, 0)` }" />
  </g>
</template>
