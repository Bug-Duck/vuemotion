<script setup lang="ts">
import { computed, ref } from 'vue'

const { width, height } = defineProps<{
  width: number
  height: number
}>()

const zoom = ref((window.innerHeight - 40) * 0.6 / height)

window.addEventListener('resize', () => {
  zoom.value = (window.innerHeight - 40) * 0.6 / height
})
</script>

<template>
  <div class="w-full h-[60%] flex">
    <div class="flex items-center justify-center">
      <svg
        :width="width" :height="height" class="bg-black" :style="{
          transform: `scale(${zoom})`,
        }" style="transform-origin: center center;"
      />
    </div>
  </div>
</template>
