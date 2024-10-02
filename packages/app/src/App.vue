<script setup lang="ts">
import Preview from './components/Preview.vue';
import Tools from './components/Tools.vue';
import TopMenubar from './components/TopMenubar.vue';
</script>

<template>
  <div class="w-screen h-screen">
    <TopMenubar />
    <div class="h-full w-full">
      <Preview :width="1600" :height="900"/>
      <Tools/>
    </div>
  </div>
</template>