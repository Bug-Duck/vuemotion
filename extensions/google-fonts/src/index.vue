<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import { ref, watchEffect } from 'vue'
import type { WidgetOptions } from '@vue-motion/lib'

export interface GoogleFontsOptions extends WidgetOptions {
  fontName: string
  fontStyle?: string
}

const props = defineProps<GoogleFontsOptions>()
const options = defineWidget<GoogleFontsOptions>(props)

const googleFontUrl = ref('')
watchEffect(() => {
  googleFontUrl.value = `https://fonts.googleapis.com/css2?family=${options.fontName.replace(/\s/g, '+')}:wght@${props.fontStyle ?? 400}&display=swap`
  loadGoogleFont(googleFontUrl.value)
})

const fontStyleObject = ref({
  fontFamily: `'${options.fontName}', sans-serif`,
})

function loadGoogleFont(url: string) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  document.head.appendChild(link)
}
</script>

<template>
  <g :style="fontStyleObject">
    <slot />
  </g>
</template>

<style scoped>
</style>
