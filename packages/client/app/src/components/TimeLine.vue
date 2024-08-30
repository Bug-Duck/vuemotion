<template>
  <div>
    <svg :width="props.duration * props.division" height="50">
      <g v-for="(i, index) in props.duration + 1" :key="i">
        <line :x1="(i - 1) * props.division" y1="0" :x2="(i - 1) * props.division" :y2="index % 5 === 0 ? 30 : 10"
          stroke="grey" stroke-width="1" />
        <text :transform="`translate(${(i - 2) * props.division}, 50)`" font-size="15" :text-anchor="(i - 2) === 0 ? 'start' : 'middle'"  font-family="mono" v-show="index % 5 === 1">{{ i - 2 }}</text>
      </g>
    </svg>
    <div class="h-full flex items-center">
      <svg :width="props.duration * props.division" height="50">
        <line x1="0" y1="25" :x2="props.duration * props.division" y2="25" stroke="grey" stroke-width="2" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  duration: number,
  division: number,
}>()
</script>