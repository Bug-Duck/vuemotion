import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  root: '.',
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'vuemotion',
      formats: ['es', 'cjs', 'iife'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
    dts({
      include: ['./src/**/*.ts'],
      rollupTypes: true,
      copyDtsFiles: true,
    }),
  ],
})
