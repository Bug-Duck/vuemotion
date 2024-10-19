import process from 'node:process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  define: {
    __D__: process.env.NODE_ENV === 'development',
  },
})
