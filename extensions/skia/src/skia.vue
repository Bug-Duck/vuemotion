<script setup lang="ts">
import { defineWidget } from "@vue-motion/core";
import type { WidgetOptions } from "@vue-motion/lib";
import { ref } from "vue";
import CanvasKitInit from "canvaskit-wasm";

export interface SkiaOptions extends WidgetOptions {
  width: number;
  height: number;
  wasmFile: string;
}

const props = defineProps<SkiaOptions>();
const options = defineWidget<SkiaOptions>(props);

const ck = await CanvasKitInit({
  locateFile(_file) {
    return options.wasmFile;
  },
});
const canvas = new OffscreenCanvas(options.width, options.height);
const surface = ck.MakeWebGLCanvasSurface(
  canvas as unknown as HTMLCanvasElement,
);

const url = ref("");

const surfaceProxy = new Proxy(surface!, {
  async apply(target: any, _thisArg, argArray) {
    url.value = window.URL.createObjectURL(await canvas.convertToBlob());
    return target(...argArray);
  },
});
</script>
