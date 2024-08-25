<script lang="ts" setup>
import { defineWidget } from "@vuemotion/vue-core";
import BaseWidget from "./base-widget.vue";
import { defineProps } from "vue";
import { MaskOptions } from "./mask.ts";

const props = withDefaults(defineProps<MaskOptions>(), {
  maskUnits: "objectBoundingBox",
  maskContentUnits: "userSpaceOnUse"
});
const options = defineWidget<MaskOptions>(props);
</script>

<template>
  <BaseWidget :rotation="options.rotation" :scaleX="options.scaleX" :scaleY="options.scaleY" :x="options.x"
              :y="options.y">
    <mask :height="options.height" :mask-content-units="options.maskContentUnits" :mask-units="options.maskUnits" :width="options.width" :x="options.x"
          :y="options.y"></mask>
  </BaseWidget>
</template>
