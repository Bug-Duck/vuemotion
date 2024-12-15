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
  grow,
  move,
  rotate,
} from "@vue-motion/lib";
import { onMounted, watch } from "vue";

const rect = useWidget<RectIns>();
const line = useWidget<LineIns>();
const arrow = useWidget<ArrowIns>();

const { play, elapsed, useAnimation, useTimeline } = usePlayer();
const timeline = useTimeline(2);

onMounted(() => {
  watch(timeline.elapsed, () => {
    console.log(timeline.elapsed.value);
  });
  useAnimation(arrow).animate(rotate, { duration: 1, offset: 200 });
  timeline
    .useAnimation(rect)
    .animate(move, { duration: 1, offsetX: 100, offsetY: 100 });

  play();
  timeline.play();
});
</script>

<template>
  <Motion :width="1600" :height="900">
    <Rect :widget="rect" :width="100" :height="100" />
    <!-- <Line :widget="line" :from="[0, 0]" :to="[200, 200]" /> -->
    <Arrow :from="[0, 0]" :to="[-200, -200]" :widget="arrow" />
  </Motion>
</template>
