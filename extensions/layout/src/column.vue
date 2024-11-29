<script setup lang="ts">
import { defineWidget, useMotion } from "@vue-motion/core";
import { type WidgetOptions, widget } from "@vue-motion/lib";

export interface ColumnOptions extends WidgetOptions {
  height: number;
}

const props = defineProps<ColumnOptions>();

const { width } = useMotion();

const options = defineWidget<ColumnOptions>(props);
</script>

<template>
  <g v-bind="widget(options)">
    <foreignObject
      :width="width - (options.x ?? 0)"
      :height="options.height - (options.y ?? 0)"
    >
      <div
        :style="{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }"
      >
        <slot />
      </div>
    </foreignObject>
  </g>
</template>
