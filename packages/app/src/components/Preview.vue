<script setup lang="ts">
/** @ts-expect-error virtual-import */
import Animation from 'virtual:user-main'
import { Motion, scale } from '@vue-motion/lib'
import { ref, watch } from 'vue'

const { width, height } = defineProps<{
  width: number
  height: number
}>()

const zoom = ref((window.innerHeight - 40) * 0.6 / height)

function updateZoom() {
  zoom.value = ((window.innerWidth - 40) * 0.6 / width) < ((window.innerHeight - 40) * 0.6 / height) ? ((window.innerHeight - 40) * 0.6 / height) : ((window.innerWidth - 40) * 0.6 / width)
}

window.addEventListener('resize', updateZoom)

watch(() => window.innerHeight, updateZoom)
</script>

<template>
  <div class="w-full h-[60%] flex overflow-hidden">
    <div class="w-full h-full flex items-center justify-center">
      <!-- <svg :viewBox="`0 0 ${width} ${height}`" class="bg-black" :style="{
        transform: `scale(${zoom})`,
        minWidth: `${width * zoom}px`,
        minHeight: `${height * zoom}px`
      }" style="transform-origin: center center;">
        <circle cx="100" cy="100" r="200" fill="white" />
      </svg> -->
      <Motion :width="width" :height="height" :scale="zoom" :min-width="width * zoom" :min-height="height * zoom">
        <Animation />
      </Motion>
    </div>
  </div>
</template>
