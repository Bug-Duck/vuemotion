<script setup lang="ts">
import { usePlayer, useWidget } from "@vue-motion/core";
import type { TextIns } from "@vue-motion/lib";
import { Group, Image, Text, fadeIn, stroke } from "@vue-motion/lib";
import { onMounted } from "vue";

const title = useWidget<TextIns>();
const text = useWidget<TextIns>();

onMounted(() => {
  const player = usePlayer();
  player.useAnimation(title).animate(stroke, { duration: 1 });
  player
    .useAnimation(text)
    .delay(1)
    .animate(fadeIn, { duration: 1, from: 0, to: 1 });
  player.play();
});
</script>

<template>
  <Group :y="-200">
    <Image href="/vite.svg" :x="-350" :width="150" :height="150" />
    <Image href="/logo.svg" :x="200" :width="150" :height="150" />
    <Image href="/vue.svg" :x="-75" :width="150" :height="150" />
  </Group>
  <Group>
    <Text
      :y="10"
      :font-size="50"
      wid="title"
      border-color="white"
      fill-color="none"
    >
      Vue + Vite + VueMotion
    </Text>
    <Text :y="70" :font-size="20" wid="text" :opacity="0">
      Build your animation with Vuejs
    </Text>
  </Group>
</template>
