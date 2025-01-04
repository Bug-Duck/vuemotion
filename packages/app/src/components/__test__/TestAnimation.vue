<script setup lang="ts">
import { Arc, Circle } from "@vue-motion/lib";
import { useMotion, usePlayer, useWidget } from "@vue-motion/core";
import { onMounted } from "vue";
import { CircleIns } from "@vue-motion/lib";

const motion = useMotion();
motion.width.value = 1600;
motion.height.value = 900;
const { play } = usePlayer();

const arc = useWidget<CircleIns>();

onMounted(() => {
  arc.move(200, 300, {
    duration: 10,
  });
  play();
});
</script>

<template>
  <Circle :radius="100" :widget="arc" />
</template>
