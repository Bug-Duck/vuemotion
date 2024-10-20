import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  root: '.',
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'vue-motion',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [
    vue(),
    dts({
      include: ['./src/**/*.ts'],
      rollupTypes: true,
      copyDtsFiles: true,
    }),
  ],
})
