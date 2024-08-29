<template>
  <div class="h-12 w-full border-b border-l select-none hover:bg-gray-300" @click="toggleOpen">
    <div class="mx-4 items-center flex flex-row h-full">
      <div class="mx-2">
        <svg width="10" height="10" v-if="!open">
          <polygon points="0,0 0,10 10,5" fill="grey" />
        </svg>
        <svg v-else width="10" height="10">
          <polygon points="0,0 10,0 5,10" fill="grey" />
        </svg>
      </div>
      <img :src="icon" :alt="name" class="w-6 h-6 mx-2" />
      <div class="text-2xl font-mono">
        {{ name }}
      </div>
    </div>
  </div>
  <ul class="w-full overflow-y-auto" v-if="open && items">
    <li v-for="(item, index) in (items || [])" :key="index">
      <div class="ml-6">
        <WidgetItem :name="item.name" :icon="item.icon" :items="item.items || []" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

export interface Item {
  name?: string;
  icon?: string;
  type?: string;
  items?: Item[];
}

const { name, icon, items } = defineProps<Item>()

const open = ref(false)

const toggleOpen = () => {
  open.value = !open.value
}
</script>
