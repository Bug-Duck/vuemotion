/// <reference types="vite/client" />

declare module '*.vue' {
  import type { ComponentOptions } from 'vue'

  const componentOptions: ComponentOptions
  export default componentOptions
}

declare const __DEV__: boolean
