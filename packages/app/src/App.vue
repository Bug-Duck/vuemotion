<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { provide, ref } from 'vue'
import Panel from 'primevue/panel'
import LeftList from './components/LeftList.vue'
import WidgetList from './components/WidgetList.vue'
import Timeline from './components/TimeLine.vue'
import Tools from './components/Tools.vue'
import Preview from './components/Preview.vue'

const scale = ref(1)

const options = ref([
  {
    label: 'File',
    icon: 'pi pi-file',
    items: [
      {
        label: 'Render',
      },
      {
        label: 'Open in VSCode',
      },
    ],
  },
  {
    label: 'View',
    icon: 'pi pi-expand',
    items: [
      {
        label: 'Theme',
        items: [
          {
            label: 'Light',
          },
          {
            label: 'Dark',
          },
        ],
      },
      {
        label: 'Zoom In',
        command() {
          scale.value += 0.1
        },
      },
      {
        label: 'Zoom Out',
        command() {
          scale.value -= 0.1
        },
      },
    ],
  },
  {
    label: 'Extensions',
    icon: 'pi pi-box',
    items: [
      {
        label: 'Add Extension',
      },
    ],
  },
  {
    label: 'Help',
    icon: 'pi pi-question-circle',
    items: [
      {
        label: 'About',
      },
      {
        label: 'Documentation',
      },
      {
        label: 'Report Issue',
      },
      {
        label: 'Support',
      },
      {
        label: 'GitHub',
      },
    ],
  },
])

provide('playing', ref(false))
</script>

<template>
  <div class="w-screen h-screen">
    <div class="flex flex-col h-full">
      <Menubar class="w-full h-8" :model="options" breakpoint="100px" />
      <div
        class="h-4/5 flex justify-center"
        :style="{ height: 'calc((100% - 5rem) / 3 * 2)' }"
      >
        <div class="w-1/4 h-full border-r">
          <LeftList />
        </div>
        <div class="w-3/4 border-1 overflow-auto preview-container items-center justify-center">
          <Preview
            :style="{
              scale,
            }"
          />
        </div>
      </div>
      <Tools />
      <div
        class="flex flex-row w-full"
        :style="{ height: 'calc((100% - 5rem) / 3)' }"
      >
        <Panel class="w-1/4 border h-full">
          <WidgetList
            :list="[
              {
                name: 'Widget 1',
              },
            ]"
            class="h-full"
          />
        </Panel>
        <Panel class="w-3/4 border">
          <Timeline />
        </Panel>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-container {
  overflow: auto;
  max-height: 100%;
}
</style>
