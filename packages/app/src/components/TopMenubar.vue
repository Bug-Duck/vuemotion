<template>
  <div class="w-full h-10 border flex flex-row select-none">
    <div class="flex flex-row">
      <img src="../assets/logo.svg" class="w-10 h-10 p-1 mr-5">
    </div>
    <div class="h-full w-16 hover:bg-gray-300" @mouseleave="options = false" @mouseenter="options = true">
      <span class="font-mono text-sm h-full flex items-center justify-center">Options</span>
      <div class="absolute bg-white border top-10 w-40 rounded-md" v-if="options">
        <div class="hover:bg-gray-300 h-8 w-full">
          <span class="font-mono text-sm h-full flex items-center justify-center">Export</span>
        </div>
      </div>
    </div>
    <div class="h-full w-16 hover:bg-gray-300" @mouseenter="view = true" @mouseleave="view = false">
      <span class="font-mono text-sm h-full flex items-center justify-center">View</span>
      <div class="absolute bg-white border top-10 w-40 rounded-md" v-if="view">
        <div class="hover:bg-gray-300 h-8 w-full">
          <span class="font-mono text-sm h-full flex items-center justify-center">Zoom In</span>
        </div>
        <div class="hover:bg-gray-300 h-8 w-full">
          <span class="font-mono text-sm h-full flex items-center justify-center">Zoom Out</span>
        </div>
      </div>
    </div>
    <div class="h-full w-16 hover:bg-gray-300" @mouseenter="help = true" @mouseleave="help = false">
      <span class="font-mono text-sm h-full flex items-center justify-center">Help</span>
      <div class="absolute bg-white border top-10 w-40 rounded-md" v-if="help">
        <div class="hover:bg-gray-300 h-8 w-full">
          <span class="font-mono text-sm h-full flex items-center justify-center">Export</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = ref(false)
const view = ref(false)
const help = ref(false)
</script>
