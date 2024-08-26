import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: '.',
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VueMotion',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
  plugins: [vue()],
})
