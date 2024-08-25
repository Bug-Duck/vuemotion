<script lang="ts" setup>
import { defineWidget } from "@vuemotion/vue-core";
import BaseWidget from "./base-widget.vue";
import { defineProps, getCurrentInstance, guardReactiveProps, onMounted, provide, ref } from "vue";
import { MaskOptions } from "./mask"

const props = withDefaults(defineProps<MaskOptions>(), {
  maskUnits: "objectBoundingBox",
  maskContentUnits: "userSpaceOnUse"
});
const options = defineWidget<MaskOptions>(props)

const id = ref()
provide('content_id', id)

onMounted(() => {
  id.value = getCurrentInstance().uid
})

</script>

<template>
  <BaseWidget :rotation="options.rotation" :scaleX="options.scaleX" :scaleY="options.scaleY" :x="options.x"
    :y="options.y">
    <mask :height="options.height" :mask-content-units="options.maskContentUnits" :mask-units="options.maskUnits"
      :width="options.width" :id="getCurrentInstance().uid.toString()">
      <slot name="mask"></slot>
      <slot name="content"></slot>
    </mask>
  </BaseWidget>
</template>
