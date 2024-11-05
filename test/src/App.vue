<script setup lang="ts">
import { usePlayer } from '@vue-motion/core';
import { defineComponent, onMounted } from 'vue';
import { createParser } from '@vue-motion/import';
import { Motion, Rect } from '@vue-motion/lib';
import { Three, Cube } from '@vue-motion/extension-three'

onMounted(() => {
  const { play } = usePlayer()
  play()
})
</script>

<template>
  <Motion id="motion" :width="1000" :height="1000">
    <Three :width="1000" :height="1000" background-color="orange" :x="-500" :y="-500">
      <Cube :width="1" :height="1" :depth="1"/>
    </Three>
  </Motion>
</template>
