<script setup lang="ts">
import type { Item } from './WidgetItem.vue'
import WidgetItem from './WidgetItem.vue'

const { list } = defineProps<{ list: Item[] }>()
</script>

<template>
  <ul class="w-full overflow-y-auto">
    <li v-for="item in list">
      <WidgetItem v-bind="item" />
    </li>
  </ul>
</template>
