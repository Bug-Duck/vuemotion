import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  root: ".",
  build: {
    lib: {
      entry: "src/index.ts",
      name: "VueMotionCore",
      formats: ["es", "cjs", "iife"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [
    vue(),
    dts({
      include: ["./src/**/*.{ts,vue}"],
      rollupTypes: true,
      copyDtsFiles: true,
    }),
  ],
});
