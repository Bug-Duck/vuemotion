<script setup lang="ts">
import { ref } from 'vue'

const options = ref(false)
const view = ref(false)
const help = ref(false)
</script>

<template>
  <div class="w-full h-10 border flex flex-row select-none">
    <div class="flex flex-row">
      <img src="../assets/logo.svg" class="w-10 h-10 p-1 mr-5">
    </div>
    <div class="h-full w-16 hover:bg-gray-300" @mouseleave="options = false" @mouseenter="options = true">
      <span class="font-mono text-sm h-full flex items-center justify-center">Options</span>
      <div v-if="options" class="absolute bg-white border top-10 w-40 rounded-md">
        <div class="hover:bg-gray-300 h-8 w-full">
          <span class="font-mono text-sm h-full flex items-center justify-center">Export</span>
        </div>
      </div>
    </div>
    <div class="h-full w-16 hover:bg-gray-300" @mouseenter="view = true" @mouseleave="view = false">
      <span class="font-mono text-sm h-full flex items-center justify-center">View</span>
      <div v-if="view" class="absolute bg-white border top-10 w-40 rounded-md">
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
      <div v-if="help" class="absolute bg-white border top-10 w-40 rounded-md">
        <a href="https://github.com/Bug-Duck/vuemotion">
          <div class="hover:bg-gray-300 h-8 w-full">
            <span class="font-mono text-sm h-full flex items-center justify-center"><i
                class="fa fa-github mx-1" />GitHub</span>
          </div>
        </a>
        <a href="https://vuemotion.dev">
          <div class="hover:bg-gray-300 h-8 w-full">
            <span class="font-mono text-sm h-full flex items-center justify-center"><i
                class="fa fa-book mx-1" />Docs</span>
          </div>
        </a>
        <a href="https://discord.gg/hpB4n7Vm">
          <div class="hover:bg-gray-300 h-8 w-full">
            <span class="font-mono text-sm h-full flex items-center justify-center">Discord</span>
          </div>
        </a>
        <a href="https://x.com/bugduckteam">
          <div class="hover:bg-gray-300 h-8 w-full">
            <span class="font-mono text-sm h-full flex items-center justify-center">X</span>
          </div>
        </a>
        <a href="mailto:bugduck@163.com">
          <div class="hover:bg-gray-300 h-8 w-full">
            <span class="font-mono text-sm h-full flex items-center justify-center"><i
                class="fa fa-envelope mx-1" />Contact
              us</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
