<script setup lang="ts">
import { inject } from 'vue'
import type { Camera, Scene } from 'three'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { defineWidget } from '@vue-motion/core'
import type { Object3DOptions } from './object3d'

export interface CubeOptions extends Object3DOptions {
  width: number
  height: number
  depth: number
}

const props = defineProps<CubeOptions>()
const options = defineWidget<CubeOptions>(props)
const camera = inject('camera') as Camera
const scene = inject('scene') as Scene

const box = new BoxGeometry(options.width, options.height, options.depth)
const material = new MeshBasicMaterial()
const cube = new Mesh(box, material)
scene.add(cube)
</script>
