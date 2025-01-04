<script setup lang="ts">
import { Motion } from "@vue-motion/lib";
/** @ts-expect-error virtual-import */
// import Animation from "virtual:user-main";
import { ref, watch, onMounted, onUnmounted } from "vue";
import TestAnimation from "./__test__/TestAnimation.vue";

const { width, height } = defineProps<{
  width: number;
  height: number;
}>();

const zoom = ref(1);
const container = ref<HTMLDivElement | null>(null);

function updateZoom() {
  if (!container.value) return;

  const rect = container.value.getBoundingClientRect();
  const containerWidth = rect.width;
  const containerHeight = rect.height;

  // Calculate aspect ratios
  const videoRatio = width / height;
  const containerRatio = containerWidth / containerHeight;

  // Determine scaling based on aspect ratio comparison
  if (containerRatio > videoRatio) {
    // Container is wider than video - use height as constraint
    zoom.value = Math.min(containerHeight / height, 1);
  } else {
    // Container is taller than video - use width as constraint
    zoom.value = Math.min(containerWidth / width, 1);
  }
}

// Update zoom when container is resized
const resizeObserver = new ResizeObserver(() => {
  updateZoom();
});

onMounted(() => {
  if (container.value) {
    resizeObserver.observe(container.value);
  }
});

onUnmounted(() => {
  resizeObserver.disconnect();
});

let dev: boolean;
if (__D__) dev = true;
else dev = false;
</script>

<template>
  <div class="flex-grow flex overflow-hidden">
    <div
      ref="container"
      class="w-full h-full flex items-center justify-center p-4"
    >
      <div
        :style="{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${zoom})`,
          transformOrigin: 'center',
        }"
        class="relative"
      >
        <Motion
          id="motion"
          :width="width"
          :height="height"
          class="max-w-full max-h-full"
        >
          <TestAnimation />
        </Motion>
      </div>
    </div>
  </div>
</template>
