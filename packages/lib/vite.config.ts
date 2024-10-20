import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  root: '.',
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VueMotionLib',
      formats: ['es', 'cjs', 'iife'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
  plugins: [
    vue(),
    dts({
      include: ['./src/**/*.ts', './src/**/*.vue'],
      rollupTypes: true,
      copyDtsFiles: true,
    }),
  ],
})
