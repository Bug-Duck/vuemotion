<script setup lang="ts">
import { defineWidget } from '@vuemotion/vue-core'
import { Arc } from '@vuemotion/vue-lib';
import { DotOptions } from './dot'

const props = defineProps<DotOptions>()
const options = defineWidget<DotOptions>(props)
</script>

<template>
  <Arc :radius="options.size ?? 5" :fill="options.fill ?? 'rgba(135,206,250,0.5)'"
    :stroke="options.border ?? 'rgba(135,206,250,1)'" :stroke-width="options.borderWidth ?? '5'"
    :stroke-dashoffset="options.offset ?? 0" :stroke-dasharray="(options.interval ?? [1, 0]).join(' ')" :rx="options.x"
    :ry="options.y" :style="{ opacity: options.opacity ?? 1 }" />
</template>
