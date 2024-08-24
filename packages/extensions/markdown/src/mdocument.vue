<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation" :x="options.x"
    :y="options.y">
    <Webview>
      <slot ref="slot"></slot>
    </Webview>
  </BaseWidget>
</template>

<script setup lang="ts">
import { defineWidget } from '@vuemotion/vue-core';
import { MDocumentOptions } from './mdocument';
import { Webview } from '@vuemotion/vue-lib';
import { marked } from 'marked'
import { onMounted, ref, Slot } from 'vue';

const props = defineProps<MDocumentOptions>()
const options = defineWidget<MDocumentOptions>(props)
const slot = ref()

onMounted(() => {
  slot.value['v-html'] = marked(slot.value.innerHTML)
})
</script>
