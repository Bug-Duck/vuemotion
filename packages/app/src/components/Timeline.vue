<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { usePlayer } from "@vue-motion/core";

const player = usePlayer();
const isDragging = ref(false);
const currentTime = ref(0);

const { widget } = defineProps<{
  widget: {
    duration: number;
  };
}>();

function handleMouseDown(e: MouseEvent) {
  isDragging.value = true;
  updateTimeFromMouseEvent(e);

  // Prevent text selection while dragging
  e.preventDefault();
}

function handleMouseMove(e: MouseEvent) {
  if (!isDragging.value) return;

  // Find the SVG element and its container
  const svg = document.querySelector("svg");
  const container = document.querySelector(".overflow-auto");
  if (!svg || !container) return;

  const containerRect = container.getBoundingClientRect();
  const scrollLeft = container.scrollLeft;

  // Calculate x position considering scroll and container offset
  // Allow negative values for smooth dragging experience
  const rawX = e.clientX - containerRect.left - 40 + scrollLeft;
  const x = Math.max(0, Math.min(widget.duration * 100, rawX)); // Clamp to timeline width
  const totalWidth = widget.duration * 100; // 100px per second

  // Auto scroll when dragging near edges or outside
  const scrollSpeed = 10;

  if (e.clientX <= containerRect.left) {
    // Mouse is left of the container - scroll left faster based on distance
    const distance = containerRect.left - e.clientX;
    container.scrollLeft = Math.max(
      0,
      scrollLeft - scrollSpeed * (1 + distance / 50),
    );
  } else if (e.clientX >= containerRect.right) {
    // Mouse is right of the container - scroll right faster based on distance
    const distance = e.clientX - containerRect.right;
    container.scrollLeft = scrollLeft + scrollSpeed * (1 + distance / 50);
  }

  // Calculate time in seconds (clamp between 0 and duration)
  const newTime = Math.max(
    0,
    Math.min(widget.duration, (x / totalWidth) * widget.duration),
  );
  currentTime.value = newTime;
  player.seek(newTime);
}

function handleMouseUp() {
  isDragging.value = false;
}

function updateTimeFromMouseEvent(e: MouseEvent) {
  const svg = e.currentTarget as SVGElement;
  const container = svg.closest(".overflow-auto");
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const scrollLeft = container.scrollLeft;

  const rawX = e.clientX - containerRect.left - 40 + scrollLeft;
  const x = Math.max(0, Math.min(widget.duration * 100, rawX));
  const totalWidth = widget.duration * 100;

  const newTime = Math.max(
    0,
    Math.min(widget.duration, (x / totalWidth) * widget.duration),
  );
  currentTime.value = newTime;
  player.seek(newTime);
}

// Add global mouse event listeners
onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseup", handleMouseUp);
});
</script>

<template>
  <div class="w-full h-full overflow-auto">
    <div class="mx-10 relative">
      <svg
        @mousedown="handleMouseDown"
        :style="{
          width: `${widget.duration * 100}px`,
          height: '60px',
        }"
        class="cursor-col-resize"
      >
        <!-- Timeline marks - 10 marks per second -->
        <line :x1="0" :y1="0" :x2="0" :y2="35" stroke="grey" stroke-width="1" />
        <line
          v-for="i in widget.duration * 10"
          :key="i"
          :x1="i * 10"
          :y1="0"
          :x2="i * 10"
          :y2="i % 10 === 0 ? 35 : i % 5 === 0 ? 25 : 15"
          stroke="grey"
          stroke-width="1"
        />

        <!-- Time labels - one per second -->
        <text :x="0" :y="50">0</text>
        <text v-for="i in widget.duration" :key="i" :x="i * 100 - 10" :y="50">
          {{ i }}
        </text>

        <!-- Current time indicator -->
        <line
          :x1="currentTime * 100"
          :y1="0"
          :x2="currentTime * 100"
          :y2="50"
          stroke="#2196f3"
          stroke-width="2"
        />
        <circle :cx="currentTime * 100" :cy="0" r="4" fill="#2196f3" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.cursor-col-resize {
  cursor: col-resize;
}
</style>
