<script setup lang="ts">
import type { WidgetOptions } from '@vue-motion/lib'
import { widget } from '@vue-motion/lib'
import { defineWidget } from '@vue-motion/core'
import { BoxGeometry, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { onMounted, ref } from 'vue'

export interface ThreeOptions extends WidgetOptions {
  width: number
  height: number
  cameraConfig?: {
    fov?: number
    aspect?: number
    near?: number
    far?: number
  }
}

const props = defineProps<ThreeOptions>()
const options = defineWidget<ThreeOptions>(props)

const scene = new Scene()
const canvas = new OffscreenCanvas(options.width, options.height)
const camera = new PerspectiveCamera(
  (options.cameraConfig ?? {}).fov ?? 50,
  (options.cameraConfig ?? {}).aspect ?? options.width / options.height,
  (options.cameraConfig ?? {}).near ?? 0.1,
  (options.cameraConfig ?? {}).far ?? 2000,
)
camera.position.z = 5

const renderer = new WebGLRenderer({
  canvas,
})

const url = ref('')

// Create a small box
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshPhongMaterial({ color: 0x00FF00 })
const cube = new Mesh(geometry, material)
scene.add(cube)

// Add a directional light
const light = new DirectionalLight(0xFFFFFF, 1)
light.position.set(5, 5, 5).normalize()
scene.add(light)

onMounted(async () => {
  renderer.render(scene, camera)
  url.value = window.URL.createObjectURL(await canvas.convertToBlob())
  console.log(url)
})
</script>

<template>
  <g v-bind="widget(options)">
    <image
      :href="url"
      :width="options.width"
      :height="options.height"
    />
  </g>
</template>
