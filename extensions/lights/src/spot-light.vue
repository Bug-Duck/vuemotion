<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { WidgetOptions } from '@vue-motion/lib'

export interface SpotLightOptions extends WidgetOptions {
  color: string
  sourceX: number
  sourceY: number
  sourceZ: number
  pointsAtX?: number
  pointsAtY?: number
  pointsAtZ?: number
  limitingConeAngle?: number
  type?: 'specular' | 'diffuse'
}

const props = defineProps<SpotLightOptions>()
const options = defineWidget<SpotLightOptions>(props)

const id = Math.random().toString(36).substring(2, 9)
const diffuseId = options.wid || `diffuse-${id}`
const specularId = options.wid || `specular-${id}`
</script>

<template>
  <filter :id="diffuseId">
    <feDiffuseLighting :lighting-color="options.color">
      <feSpotLight
        :x="options.sourceX"
        :y="options.sourceY"
        :z="options.sourceZ"
        :pointsAtX="options.pointsAtX"
        :pointsAtY="options.pointsAtY"
        :pointsAtZ="options.pointsAtZ"
        :limitingConeAngle="options.limitingConeAngle"
      />
    </feDiffuseLighting>
  </filter>
  <filter :id="specularId">
    <feSpecularLighting :lighting-color="options.color">
      <feSpotLight
        :x="options.sourceX"
        :y="options.sourceY"
        :z="options.sourceZ"
        :pointsAtX="options.pointsAtX"
        :pointsAtY="options.pointsAtY"
        :pointsAtZ="options.pointsAtZ"
        :limitingConeAngle="options.limitingConeAngle"
      />
    </feSpecularLighting>
  </filter>
  <g :filter="`url(#${options.type === 'specular' ? specularId : diffuseId})`">
    <slot />
  </g>
</template>
