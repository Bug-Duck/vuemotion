<script setup lang="ts">
import { $typst } from "@myriaddreamin/typst.ts/dist/esm/contrib/snippet";
import { defineWidget } from "@vue-motion/core";
import { type WidgetOptions, widget } from "@vue-motion/lib";
import { onMounted, ref, useSlots } from "vue";

export interface TypstOptions extends WidgetOptions {
  width?: number;
  height?: number;
}

const props = defineProps<TypstOptions>();
const options = defineWidget<TypstOptions>(props);

const compiled = ref();

const slots = useSlots();
const content = slots.default
  ? slots
      .default()
      .map((vnode) => vnode.children)
      .join("")
  : "";

onMounted(async () => {
  console.log(content);
  compiled.value = await $typst.svg({
    mainContent: content,
  });
});
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
  <g v-bind="widget(options)" v-html="compiled" />
</template>
