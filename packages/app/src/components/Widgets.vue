<script setup lang="ts">
interface Widget {
  type: string
}

const { widgets } = defineProps<{
  widgets?: Widget[]
}>()
</script>

<template>
  <div class="w-full h-full overflow-y-visible flex flex-col">
    <div v-for="widget in widgets" :key="widget.type" class="h-10 w-full border-b font-mono flex items-center justify-center hover:bg-gray-300">
      {{ widget.type }}
    </div>
  </div>
</template>
