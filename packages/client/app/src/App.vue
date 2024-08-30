<template>
  <div class="w-screen h-screen bg-white dark:bg-gray-600 border-2">
    <div class="flex flex-row h-full">
      <div class="flex w-1/4 border-r-2">
        <WidgetList :list="list"/>
      </div>
      <div class="flex w-3/4 flex-col h-full">
        <div class="flex flex-grow-[2] border-b-2">
          <Animation/>
        </div>
        <div class="flex flex-grow-[1] overflow-x-scroll">
          <TimeLine :duration="120" :division="50" class="mx-12"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WidgetList from './components/WidgetList.vue'
import TimeLine from './components/TimeLine.vue'
/** @ts-ignore */
import Animation from 'virtual:user-main'

const list = ref([
  {
    name: 'Widget 1',
    icon: '',
    items: [
      {
        name: 'Widget 1',
        icon: ''
      }, {
        name: 'Widget 1',
        icon: ''
      }, {
        name: 'Widget 1',
        icon: ''
      }, {
        name: 'Widget 1',
        icon: ''
      },
    ]
  }
])
</script>