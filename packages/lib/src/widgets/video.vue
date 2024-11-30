<script setup lang="ts">
import { defineProps, onMounted } from "vue";
import { defineWidget, usePlayer } from "@vue-motion/core";
import { ref, watch } from "vue";
import { type WidgetOptions, widget } from "./widget";

export interface VideoOptions extends WidgetOptions {
  from?: number;
  to?: number;
  loop?: boolean;
  autoPlay?: boolean;
  fps?: number;
  href: string;
}

const props = defineProps<VideoOptions>();
const options = defineWidget<VideoOptions>(props);

const video = document.createElement("video");
video.src = props.href;
video.loop = props.loop ?? false;
video.autoplay = props.autoPlay ?? true;
video.controls = true;
video.load();
document.body.appendChild(video);

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

onMounted(() => {
  video.play();
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    canvas.value.width = 1000;
    canvas.value.height = 600;
  }
});

let render_lock: boolean = false;

async function canvas_render() {
  if (ctx && canvas.value) {
    ctx.drawImage(video, 0, 0, canvas.value.width, canvas.value.height);
  }
}

async function updateFrame(newVal: number) {
  console.log("updateFrame", newVal, video.currentTime);

  canvas_render();

  if (render_lock) return;

  if (Math.abs(video.currentTime - newVal) < 0.5) return;
  render_lock = true;

  video.currentTime = newVal;
  video.play();
  video.muted = true;
  console.log(newVal);
  canvas_render();
  render_lock = false;
}

const { elapsed } = usePlayer();
watch(elapsed, updateFrame);

updateFrame(elapsed.value);
</script>

<template>
  <g v-bind="widget(options)" style="transform: translate(-50%, -50%)">
    <foreignObject width="1000" height="600">
      <canvas :width="1000" :height="600" ref="canvas"></canvas>
    </foreignObject>
  </g>
</template>
