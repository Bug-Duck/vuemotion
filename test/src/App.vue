<script setup lang="ts">
import { usePlayer, useWidget } from '@vue-motion/core';
import { create, TextOptions, Text, TextUnit, Mask, Arc, MaskOptions } from '@vue-motion/lib';
import { Motion } from '@vue-motion/lib'
import { NumberPlane, NumberPlaneOptions } from '@vue-motion/extension-math';
import { onMounted } from 'vue';

// player.play()

const text1 = useWidget<TextOptions>('text1')
const plane = useWidget<NumberPlaneOptions>('plane')
const mask = useWidget<MaskOptions>('www')
// const fn = useWidget<MathFunctionOptions>('fn')
// const text2 = useWidget('text2')

onMounted(async () => {
  const player = usePlayer()
  // player.useAnimation(text1).animate(fadeIn, { duration: 2, from: 0, to: 1 })
  player.useAnimation(plane).animate(create, { duration: 2 })
    .exec((w) => {

    })

  player.useAnimation(text1)
    .exec((t) => {
      console.log("It's MyGo")
    })
  // player.useAnimation(fn).animate(create, { duration: 2 })
  player.play()
})
</script>
<template>
  <Motion :width="900" :height="600" id="motion">
    <!-- <RouterView /> -->
    <Mask :width="100" :height="100">
      <template #mask>
        <Arc :radius="50" :fill-color="'red'" />
      </template>
      <template #target>
        <Text wid="text1">
          <TextUnit :font-style="'oblique'" :fill-color="'black'">BanG Dream</TextUnit>
          <br />
          <TextUnit :font-family="'mono'">It's MyGo!!!!!</TextUnit>
        </Text>
      </template>
    </Mask>
    <!-- <Text :x="100" wid="text2">WORLD</Text> -->
    <!-- <NumberAxis :ranges="[-3, 2]"/> -->
    <NumberPlane :ranges-x="[-3, 3]" :ranges-y="[-2, 2]" wid="plane"></NumberPlane>
    <!-- <MathFunction :fn="Math.sin" :ranges="[-3, 3]" :domain="[-3, 3]" wid="fn" :x="0" :y="0"/> -->
    <!-- <Tex :scale-x="0.1" :scale-y="0.1">c = \\pm\\sqrt{a^2 + b^2}</Tex> -->
  </Motion>
</template>
