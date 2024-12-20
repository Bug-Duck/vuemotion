<script setup lang="ts">
import { usePlayer, useWidget } from "@vue-motion/core";
import { Motion, Rect, RectIns } from "@vue-motion/lib";
import { onMounted } from "vue";

const { play, useTimeline } = usePlayer();

const timeline1 = useTimeline(2);

const rect = useWidget<RectIns>();

// whenRender((elapsed) => {
//   console.log(elapsed)
// })

onMounted(() => {
  // timeline1.useAnimation(rect)
  //   .animate(move, {
  //     offsetX: 200,
  //     offsetY: 300,
  //     duration: 1,
  //   })
  rect.move(200, 300);
  rect.delay(1);
  rect.exec(() => {
    rect.borderColor = "yellow";
    console.log(rect.elapsed);
  });
  rect.delay(1);
  rect.exec(() => {
    rect.borderColor = "blue";
    console.log(rect.elapsed);
  });
  timeline1.play();
  play();
});
</script>

<template>
  <Motion :width="1600" :height="1000">
    <Rect :widget="rect" :width="100" :height="100" />
  </Motion>
</template>
