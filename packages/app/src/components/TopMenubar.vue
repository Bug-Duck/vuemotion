<script setup lang="ts">
import { reactive } from "vue";

interface MenuItem {
  name: string;
  action?: () => void;
  children?: MenuItem[];
  showMenu?: boolean;
}

const menu: MenuItem[] = reactive([
  {
    name: "Options",
    children: [
      {
        name: "Export",
        action: () => {
          console.log("Export");
        },
      },
    ],
  },
  {
    name: "View",
    children: [
      {
        name: "Zoom In",
        action: () => {
          console.log("Zoom In");
        },
      },
      {
        name: "Zoom Out",
        action: () => {
          console.log("Zoom Out");
        },
      },
    ],
  },
  {
    name: "Help",
    children: [
      {
        name: "GitHub",
        action: () => {
          window.open("https://github.com/Bug-Duck/vuemotion");
        },
      },
      {
        name: "Docs",
        action: () => {
          window.open("https://vuemotion.dev/");
        },
      },
      {
        name: "Discord",
        action: () => {
          window.open("https://discord.gg/PUVcpkv8");
        },
      },
      {
        name: "X",
        action: () => {
          window.open("https://twitter.com/bugduckteam");
        },
      },
      {
        name: "Contact us",
        action: () => {
          window.open("");
        },
      },
    ],
  },
]);
</script>

<template>
  <div class="w-full h-10 border flex flex-row select-none">
    <div class="flex flex-row">
      <img src="../assets/logo.svg" class="w-10 h-10 p-1" alt="logo" />
    </div>
    <div
      class="relative h-full inline-block hover:bg-gray-300 transition-all cursor-pointer p-3"
      @mouseleave="item.showMenu = false"
      @mouseenter="item.showMenu = true"
      v-for="(item, key) in menu"
      @click="item.action"
      v-bind:key="key"
    >
      <span class="font-mono text-sm h-full flex items-center justify-center">{{
        item.name
      }}</span>
      <span
        v-if="item.children"
        v-show="item.showMenu"
        class="absolute bg-white border top-full left-0 w-40 rounded-md z-30"
      >
        <div
          class="hover:bg-gray-300 transition-all p-2 pl-4 w-full"
          v-for="(child, key) in item.children"
          @click="child.action"
          v-bind:key="key"
        >
          <span class="font-mono text-sm h-full">{{ child.name }}</span>
        </div>
      </span>
    </div>
  </div>
</template>
