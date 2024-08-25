<template>
  <div class="flex flex-col border h-full w-full">
    <div v-for="widget in props.widgets" class="border m-0 p-0 w-full h-12 items-center flex hover:bg-gray-300">
      <span class="ml-3">
        {{ widget.type }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  widgets: Array<{
    type: string
    icon?: string
    children?: string
  }>
}>()
</script>
