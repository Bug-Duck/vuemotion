<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { WidgetOptions } from '@vue-motion/lib'

export interface PointLightOptions extends WidgetOptions {
  constant?: number
  exponent?: number
  surfaceScale?: number
  color: string
  sourceX: number
  sourceY: number
  sourceZ: number
  type?: 'diffuse' | 'specular'
}

const props = defineProps<PointLightOptions>()
const options = defineWidget<PointLightOptions>(props)

const id = Math.random().toString(36).substring(2, 9)
const diffuseId = options.wid || `diffuse-${id}`
const specularId = options.wid || `specular-${id}`
</script>

<template>
  <filter :id="diffuseId">
    <feDiffuseLighting
      :result="diffuseId"
      :lighting-color="options.color"
    >
      <fePointLight
        :x="options.sourceX"
        :y="options.sourceY"
        :z="options.sourceZ"
        :diffuse-constant="options.type === 'diffuse' ? options.constant : ''"
        :diffuse-exponent="options.type === 'diffuse' ? options.exponent : ''"
        :surface-scale="options.surfaceScale"
      />
    </feDiffuseLighting>
  </filter>
  <filter :id="specularId">
    <feSpecularLighting
      :result="specularId"
      :lighting-color="options.color"
    >
      <fePointLight
        :x="options.sourceX"
        :y="options.sourceY"
        :z="options.sourceZ"
        :specular-constant="options.type === 'specular' ? options.constant : ''"
        :specular-exponent="options.type === 'specular' ? options.exponent : ''"
        :surface-scale="options.surfaceScale"
      />
    </feSpecularLighting>
  </filter>
  <g :filter="`url(#${options.type === 'diffuse' ? diffuseId : specularId})`">
    <slot />
  </g>
</template>
