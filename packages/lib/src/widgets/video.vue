<script setup lang="ts">
import { defineProps } from 'vue'
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
video.loop = props.loop ?? false
video.autoplay = props.autoPlay ?? false
video.load()

const canvas = new OffscreenCanvas(video.width, video.height) // Initial size
const ctx = canvas.getContext('2d')

const url = ref('')

async function updateFrame(newVal: number) {
  video.currentTime = Math.floor(newVal)
  console.log(newVal)

  // console.log(newVal / (options.fps ?? 60))
  canvas.width = 1000
  canvas.height = 600
  ctx?.drawImage(video, 0, 0, canvas.width, canvas.height) // Use video instead of image
  url.value = window.URL.createObjectURL(await canvas.convertToBlob())
}

const { elapsed } = usePlayer()
watch(elapsed, updateFrame)

updateFrame(elapsed.value)
</script>

<template>
  <g v-bind="widget(options)">
    <image :href="url" width="1000" height="600" />
  </g>
</template>
