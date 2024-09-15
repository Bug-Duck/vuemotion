<script setup lang="ts">
import { defineProps, ref } from 'vue'

export interface Item {
  name?: string
  icon?: string
  type?: string
  items?: Item[]
}

const { name, items } = defineProps<Item>()

const open = ref(false)

function toggleOpen() {
  open.value = !open.value
}
</script>

<template>
  <div class="h-6 w-full border-b border-l select-none hover:bg-gray-300" @click="toggleOpen">
    <div class="mx-4 items-center flex flex-row h-full">
      <div class="mx-2">
        <svg v-if="!open" width="10" height="10">
          <polygon points="0,0 0,10 10,5" fill="grey" />
        </svg>
        <svg v-else width="10" height="10">
          <polygon points="0,0 10,0 5,10" fill="grey" />
        </svg>
      </div>
      <!-- <img :src="icon" :alt="name" class="w-6 h-6 mx-2" /> -->
      <div class="text-xl font-mono">
        {{ name }}
      </div>
    </div>
  </div>
  <ul v-if="open && items" class="w-full overflow-y-auto">
    <li v-for="(item, index) in (items || [])" :key="index">
      <div class="ml-6">
        <WidgetItem :name="item.name" :icon="item.icon" :items="item.items || []" />
      </div>
    </li>
  </ul>
</template>
