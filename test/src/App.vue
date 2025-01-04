<script setup lang="ts">
import { usePlayer, useWidget } from "@vue-motion/core";
import { easeInBack, Motion, Rect, RectIns } from "@vue-motion/lib";
import { onMounted } from "vue";

const { play, useTimeline } = usePlayer();

const timeline1 = useTimeline(2);

const rect = useWidget<RectIns>();

function rotate() {
  rect.repeat();
  rect.rotate(360, {
    duration: 0.5,
    by: easeInBack,
  });
  rect.repeatEnd(() => console.log("repeat end"));
}

onMounted(() => {
  play();
});
</script>

<template>
  <Motion :width="1600" :height="1000">
    <Rect :widget="rect" :width="100" :height="100" @click="rotate()" />
  </Motion>
</template>
