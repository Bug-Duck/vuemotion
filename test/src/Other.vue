<script setup lang="ts">
import { usePlayer, useWidget } from "@vue-motion/core";
import { Motion, Rect, type RectIns, easeInOutCirc } from "@vue-motion/lib";
import { onMounted } from "vue";

const rect = useWidget<RectIns>();

const { play } = usePlayer();

onMounted(() => {
  rect.move(100, 100);
  // rect.rotate(180)
  // rect.rotateTo(200)
  // rect.zoomTo(3, 3)
  rect.focusOn({
    by: easeInOutCirc,
  });
  rect.moveOnPath(
    "M 100 100 Q 100 200 200 200 Q 300 200 300 100 Q 300 0 200 0 Q 100 0 100 100 Z",
    {
      by: easeInOutCirc,
    },
  );
  rect.moveOnFunction(
    (progress) => ({
      x: 100 + 200 * progress,
      y: 100 + 200 * progress,
    }),
    {
      by: easeInOutCirc,
    },
  );
  rect.discolorate("border", "rgba(0, 10, 10, 0.5)");
  play();
});
</script>

<template>
  <Motion :width="1600" :height="900">
    <Rect :widget="rect" :width="100" :height="100" fill-color="red" />
  </Motion>
</template>
