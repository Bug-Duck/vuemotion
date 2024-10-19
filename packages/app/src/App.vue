<script setup lang="ts">
import Preview from './components/Preview.vue'
import Timeline from './components/Timeline.vue'
import Tools from './components/Tools.vue'
import TopMenubar from './components/TopMenubar.vue'
import Widgets from './components/Widgets.vue'
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <TopMenubar />
    <div class="flex-grow flex flex-col overflow-hidden">
      <Preview :width="1600" :height="900" />
      <Tools class="flex-shrink-0" />
      <div class="flex-grow flex flex-row overflow-hidden">
        <div class="w-1/4 overflow-y-auto">
          <Widgets
            :widgets="[
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
            ]"
          />
        </div>
        <div class="w-3/4 overflow-auto">
          <Timeline :widget="{
            duration: 1000
          }"/>
        </div>
      </div>
    </div>
  </div>
</template>
