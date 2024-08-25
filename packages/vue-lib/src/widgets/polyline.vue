<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation" :x="options.x" :y="options.y" >
    <polyline :points="options.points" :fill="options.fill || 'none'" :stroke="options.border" :path-length="options.pathLength" />
  </BaseWidget>
</template>

<script setup lang="ts">
import { defineWidget } from "@vuemotion/vue-core";
import { PolylineOptions } from "./polyline.ts";
import BaseWidget from "./base-widget.vue";

const props = defineProps<PolylineOptions>()
const options = defineWidget<PolylineOptions>(props)
</script>
