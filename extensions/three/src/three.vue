<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import type { WidgetOptions } from '@vue-motion/lib'
import { widget } from '@vue-motion/lib'
import { TresCanvas } from '@tresjs/core'

export interface ThreeOptions extends WidgetOptions {
  width: number
  height: number
  cameraPosition?: [number, number, number]
  cameraLookAt?: [number, number, number]
  fov?: number
  near?: number
  far?: number
  aspect?: number
  backgroundColor?: string
  autoCenter?: boolean
}

const props = defineProps<ThreeOptions>()
const options = defineWidget<ThreeOptions>(props)
</script>

<template>
  <g v-bind="widget(options)">
    <foreignObject :width="options.width" :height="options.height">
      <div
        :style="{
          color: 'white',
          margin: '0',
          width: `${options.width}px`,
          height: `${options.height}px`,
        }" xmlns="http://www.w3.org/1999/xhtml"
      >
        <TresCanvas
          :clear-color="options.backgroundColor ?? 'black'"
        >
          <TresPerspectiveCamera />
          <slot />
        </TresCanvas>
      </div>
    </foreignObject>
  </g>
</template>

<!--

            :position="options.cameraPosition ?? void 0"
            :look-at="options.cameraLookAt ?? void 0"
            :fov="options.fov ?? void 0"
            :near="options.near ?? void 0"
            :far="options.far ?? void 0"
            :aspect="options.aspect ?? void 0"
-->
