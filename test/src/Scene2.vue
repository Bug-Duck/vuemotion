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
import { usePlayer, useWidget } from '@vuemotion/core'
import { Arc, Motion, Text, create, fadeOut, rotate } from '@vuemotion/lib'
import { Window } from '@vuemotion/extension-ui'
import { onMounted, ref } from 'vue'
import { useExporter } from '@vuemotion/core'
import { nextTick } from 'vue'
</script>