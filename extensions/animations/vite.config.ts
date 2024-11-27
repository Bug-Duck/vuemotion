import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

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
    vue(),
    dts({
      include: ['src/**/*.ts'],
      rollupTypes: true,
    }),
  ],
})
