<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y">
    <image :href="options.href" :height="options.height" :width="options.width" :decoding="options.decoding" :preserve-aspect-ratio="options.preserveAspectRatio" :x="options.x" :y="options.y" :crossorigin="options.crossorigin" />
  </BaseWidget>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { ImageOptions } from "./image.ts";
import { defineWidget } from "@vuemotion/vue-core";
import BaseWidget from "./base-widget.vue";

const props = withDefaults(defineProps<ImageOptions>(), {
  decoding: "auto",
  preserveAspectRatio: "xMidYMid"
});
const options = defineWidget<ImageOptions>(props);
</script>
