<script setup lang="ts">
// Import the defineWidget function from the vue-motion core library
import { defineWidget } from '@vue-motion/core'
// Import the WidgetOptions type from the vue-motion lib library
import type { WidgetOptions } from '@vue-motion/lib'

// Define the DistantLightOptions interface, which extends the WidgetOptions interface
export interface DistantLightOptions extends WidgetOptions {
  color?: string
  azimuth?: number
  elevation?: number
  type?: 'diffuse' | 'specular'
}

// Set default values for the optional props
const props = withDefaults(defineProps<DistantLightOptions>(), {
  color: '#ffffff',    // Default color is white
  azimuth: 45,         // Default azimuth angle
  elevation: 30,       // Default elevation angle
  type: 'diffuse'      // Default light type is 'diffuse'
})

// Define the widget options for the component, which are of type DistantLightOptions
const options = defineWidget<DistantLightOptions>(props)

// Generate a random id for the component
const id = Math.random().toString(36).substring(2, 9)
// Generate a diffuse id for the component, which is either the wid property of the options or a generated id
const diffuseId = options.wid || `diffuse-${id}`
// Generate a specular id for the component, which is either the wid property of the options or a generated id
const specularId = options.wid || `specular-${id}`
</script>

<template>
  <!-- Define a filter element with the diffuse id -->
  <filter :id="diffuseId">
    <!-- Define a feDiffuseLighting element with the color property of the options -->
    <feDiffuseLighting :lighting-color="options.color">
      <!-- Define a feDistantLight element with the azimuth and elevation properties of the options -->
      <feDistantLight :azimuth="options.azimuth" :elevation="options.elevation" />
    </feDiffuseLighting>
  </filter>
  <!-- Define a filter element with the specular id -->
  <filter :id="specularId">
    <!-- Define a feSpecularLighting element with the color property of the options -->
    <feSpecularLighting :lighting-color="options.color">
      <!-- Define a feDistantLight element with the azimuth and elevation properties of the options -->
      <feDistantLight :azimuth="options.azimuth" :elevation="options.elevation" />
    </feSpecularLighting>
  </filter>
  <g :filter="`url(#${options.type === 'specular' ? specularId : diffuseId})`">
    <!-- Render the slot content -->
    <slot />
  </g>
</template>
