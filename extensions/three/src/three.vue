<script setup lang="ts">
import type { WidgetOptions } from '@vue-motion/lib'
import { widget } from '@vue-motion/lib'
import { defineWidget } from '@vue-motion/core'
import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { onMounted, provide, ref } from 'vue'

export interface ThreeOptions extends WidgetOptions {
  width: number
  height: number
  cameraConfig?: {
    fov?: number
    aspect?: number
    near?: number
    far?: number
  }
  background?: string
}

const props = defineProps<ThreeOptions>()
const options = defineWidget<ThreeOptions>(props)

const scene = new Scene()
scene.background = new Color(options.background ?? 'black')
const canvas = new OffscreenCanvas(options.width, options.height)
const camera = new PerspectiveCamera(
  (options.cameraConfig ?? {}).fov ?? 50,
  (options.cameraConfig ?? {}).aspect ?? options.width / options.height,
  (options.cameraConfig ?? {}).near ?? 0.1,
  (options.cameraConfig ?? {}).far ?? 2000,
)

const renderer = new WebGLRenderer({
  canvas,
})

provide('scene', scene)
provide('camera', camera)

const url = ref('')

renderer.setSize(options.width, options.height)
renderer.setPixelRatio(window.devicePixelRatio)

onMounted(async () => {
  renderer.render(scene, camera)
  url.value = window.URL.createObjectURL(await canvas.convertToBlob())
})
</script>

<template>
  <g v-bind="widget(options)">
    <image
      :href="url"
    />
  </g>
</template>
