<script setup lang="ts">
import { computed } from 'vue';

const { width, height } = defineProps<{
  width: number;
  height: number;
}>()

const zoom = computed(() => (window.innerHeight - 40) * 0.6 / height)
</script>

<template>
  <div class="w-full h-[60%] flex">
    <div class="flex items-center">
      <svg :width="width" :height="height" class="bg-black" :style="{
        transform: `scale(${zoom})`
      }"></svg>
    </div>
  </div>
</template>