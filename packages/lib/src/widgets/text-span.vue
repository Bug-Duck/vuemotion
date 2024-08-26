<script setup lang="ts">
import { defineProps } from 'vue'
import { defineWidget } from '@vuemotion/core'
import type { Text } from './defines'
import { textDefaults } from './defines'
import Super from './figure.vue'

const props = withDefaults(defineProps<Text>(), textDefaults)
const options = defineWidget(props)
</script>

<template>
  <Super v-bind="options">
    <text
      :font-weight="options.fontWeight"
      :font-style="options.fontStyle"
      :font-size="options.fontSize"
      :font-family="options.fontFamily"
      :text-anchor="options.align"
      :dominant-baseline="options.baseline"
      :text-decoration="options.decoration"
      :word-spacing="options.wordSpacing"
      :letter-spacing="options.letterSpacing"
    >
      <slot />
    </text>
  </Super>
</template>
