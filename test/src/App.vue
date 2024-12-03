<script setup lang="ts">
import { usePlayer, useWidget } from "@vue-motion/core";
import {
  LineIns,
  Motion,
  Rect,
  type RectIns,
  easeInOutCirc,
  Line,
  Arrow,
  ArrowIns,
} from "@vue-motion/lib";
import { onMounted } from "vue";
import { NumberPlane } from "@vue-motion/extension-math";

const rect = useWidget<RectIns>();
const line = useWidget<LineIns>();
const arrow = useWidget<ArrowIns>();

const { play, elapsed } = usePlayer();

onMounted(() => {
  rect.move(100, 100);
  // rect.rotate(180)
  // rect.rotateTo(200)
  // rect.zoomTo(3, 3)

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
  rect.parallel(
    (r) => r.discolorateFillTo("skyblue"),
    (r) => r.discolorateBorderTo("blue"),
    (r) => r.move(-200, -200),
  );
  rect.exec(() => {
    console.log("Hello, world!");
  });

  line.grow();
  arrow.grow();
  play();

  document.addEventListener("click", () => {
    console.log(elapsed.value);
  });
});
</script>

<template>
  <Motion :width="1600" :height="900">
    <Rect :widget="rect" :width="100" :height="100" />
    <Line :widget="line" :from="[0, 0]" :to="[200, 200]" />
    <Arrow :from="[0, 0]" :to="[-200, -200]" :widget="arrow" />
    <NumberPlane :domain-x="[-5, 4]" :domain-y="[-3, 2]" :grid="true" />
  </Motion>
</template>
