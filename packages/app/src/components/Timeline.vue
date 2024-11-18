<script setup lang="ts">
const { widget } = defineProps<{
  widget: {
    duration: number
  }
}>()
</script>

<template>
  <div class="w-full h-full overflow-scroll">
    <div class="mx-10">
      <svg
        :style="{
          width: `${widget.duration * 10}px`,
          textAlign: 'center',
        }"
      >
        <line
          :x1="0" :y1="0" :x2="0" :y2="35
          " stroke="grey" stroke-width="1"
        />
        <line
          v-for="i in (widget.duration * 10 - 10)" :key="i" :x1="i * 10" :y1="0" :x2="i * 10" :y2="i % 10 === 0 ? 35 : i % 5 === 0 ? 25 : 15
          " stroke="grey" stroke-width="1"
        />
        <text :x="0" :y="50">0</text>
        <text v-for="i in (widget.duration - 1)" :key="i" :x="i * 100" :y="50">{{ i }}</text>
      </svg>
    </div>
  </div>
</template>
