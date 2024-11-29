<script setup lang="ts">
import { Motion } from "@vue-motion/lib";
/** @ts-expect-error virtual-import */
import Animation from "virtual:user-main";
import { ref, watch } from "vue";
// import TestAnimation from './__test__/TestAnimation.vue'

const { width, height } = defineProps<{
  width: number;
  height: number;
}>();

const zoom = ref(((window.innerHeight - 40) * 0.6) / height);

function updateZoom() {
  zoom.value =
    ((window.innerWidth - 40) * 0.6) / width <
    ((window.innerHeight - 40) * 0.6) / height
      ? ((window.innerHeight - 40) * 0.6) / height
      : ((window.innerWidth - 40) * 0.6) / width;
}

window.addEventListener("resize", updateZoom);

watch(() => window.innerHeight, updateZoom);

let dev: boolean;
if (__D__) dev = true;
else dev = false;
</script>

<template>
  <div class="w-full h-[60%] flex overflow-hidden">
    <div class="w-full h-full flex items-center justify-center">
      <Motion
        id="motion"
        :width="width"
        :height="height"
        :scale="dev ? zoom : (null as any)"
        :min-width="dev ? width * zoom : (null as any)"
        :min-height="dev ? height * zoom : (null as any)"
      >
        <Animation />
        <!-- <TestAnimation/> -->
      </Motion>
    </div>
  </div>
</template>
