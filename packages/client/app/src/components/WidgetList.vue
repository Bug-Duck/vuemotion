<template>
  <ul class="w-full overflow-y-auto">
    <li v-for="item in list">
      <WidgetItem v-bind="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import WidgetItem, { Item } from './WidgetItem.vue';

const { list } = defineProps<{ list: Item[] }>()
</script>
