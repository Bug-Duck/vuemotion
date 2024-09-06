<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { ref } from 'vue';
import LeftList from './components/LeftList.vue';
import WidgetList from './components/WidgetList.vue';
import Timeline from './components/TimeLine.vue';
import Tools from './components/Tools.vue';

const options = ref([
  {
    label: 'File',
    icon: 'pi pi-file',
    items: [
      {
        label: 'Render',
      },
      {
        label: 'Open in VSCode'
      }
    ]
  },
  {
    label: 'View',
    icon: 'pi pi-expand',
    items: [
      {
        label: 'Theme',
        items: [
          {
            label: 'Light'
          },
          {
            label: 'Dark'
          }
        ]
      }
    ]
  },
  {
    label: 'Extensions',
    icon: 'pi pi-box',
    items: [
      {
        label: 'Add Extension'
      }
    ]
  },
  {
    label: 'Help',
    icon: 'pi pi-question-circle',
    items: [
      {
        label: 'About'
      },
      {
        label: 'Documentation'
      },
      {
        label: 'Report Issue'
      },
      {
        label: 'Support'
      },
      {
        label: 'GitHub'
      }
    ]
  },
])
</script>

<template>
  <div class="w-screen h-screen">
    <div class="flex flex-col h-full">
      <Menubar class="w-full h-12" :model="options" breakpoint="100px"></Menubar>
      <div class="h-4/5 flex justify-center" :style="{
        height: 'calc((100% - 5rem) / 3 * 2)'
      }">
        <div class="w-1/4 h-full border-r">
          <LeftList />
        </div>
        <div class="w-3/4 border-1">Preview</div>
      </div>
      <Tools/>
      <div class="flex flex-row w-full" :style="{
        height: 'calc((100% - 5rem) / 3)'
      }">
        <div class="w-1/4 border h-full">
          <WidgetList :list="[
            {
              name: 'Widget 1'
            }
          ]" class="h-full" />
        </div>
        <div class="w-3/4 border">
          <Timeline/>
        </div>
      </div>
    </div>
  </div>
</template>