<script setup lang="ts">
import { defineWidget, usePlayer } from '@vue-motion/core'
import { ref, watch } from 'vue'
import { type WidgetOptions, widget } from './widget'

export interface VideoOptions extends WidgetOptions {
  from?: number
  to?: number
  loop?: boolean
  autoPlay?: boolean
  fps?: number
  href: string
}

const props = defineProps<VideoOptions>()
const options = defineWidget<VideoOptions>(props)

const video = document.createElement('video')
video.src = props.href
video.loop = props.loop
video.autoplay = props.autoPlay
video.load()

const canvas = new OffscreenCanvas(video.width, video.height)
canvas.width = video.width
canvas.height = video.height
const ctx = canvas.getContext('2d')

const image = document.createElement('img')

const url = ref('')

const { elapsed } = usePlayer()
watch(elapsed, async (newVal) => {
  video.currentTime = newVal / (options.fps ?? 60)
  ctx?.drawImage(image, 0, 0)
  url.value = window.URL.createObjectURL(await canvas.convertToBlob())
})
</script>

<template>
  <g v-bind="widget(options)">
    <image :href="url" />
  </g>
</template>
