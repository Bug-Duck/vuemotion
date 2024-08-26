<script setup lang="ts">
import { defineWidget } from '@vuemotion/vue-core';
import { BaseWidget } from '@vuemotion/vue-lib';
import { ProgressBarOptions } from './progress-bar';

const props = defineProps<ProgressBarOptions>()
const options = defineWidget<ProgressBarOptions>(props)
</script>

<template>
  <BaseWidget :scaleX="options.scaleX" :scaleY="options.scaleY" :rotation="options.rotation">
    <rect :x="-options.width / 2" :y="-10" rx="10" ry="10" :fill="options.fill || 'gray'" :width="options.width" :height="20"></rect>
    <rect :x="-options.width / 2 + 5" :y="-5" rx="5" ry="5" :fill="options.fill || 'lightgreen'" :width="(options.width - 10) * options.value" :height="10"></rect>
  </BaseWidget>
</template>