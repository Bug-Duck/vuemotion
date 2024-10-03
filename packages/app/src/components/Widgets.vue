<template>
  <div class="w-full h-full overflow-y-visible flex flex-col">
    <div class="h-10 w-full border-b font-mono flex items-center justify-center hover:bg-gray-300" v-for="widget in widgets" :key="widget.type">
      {{ widget.type }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Widget {
  type: string
}

const { widgets } = defineProps<{
  widgets?: Array<Widget>
}>()
</script>
