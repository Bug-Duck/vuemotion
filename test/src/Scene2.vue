<template>
  <Window :width="600" :height="400">
    <Arc :radius="100" wid="arc" />
    <Text wid="text" font-size="50">
      vue
      <tspan fill="red">
        motion
      </tspan>
    </Text>
  </Window>
</template>

<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core'
import { Arc, Motion, Text, create, fadeOut, rotate } from '@vue-motion/lib'
import { Window } from '@vue-motion/extension-ui'
import { onMounted, ref } from 'vue'
import { useExporter } from '@vue-motion/core'
import { nextTick } from 'vue'
</script>