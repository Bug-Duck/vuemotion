<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { Object3DOptions } from './object3d'

export interface CubeOptions extends Object3DOptions {
  width: number
  height: number
  depth: number
}

const props = defineProps<CubeOptions>()
const options = defineWidget<CubeOptions>(props)
</script>

<template>
  <TresMesh :scale="1" cast-shadow>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
