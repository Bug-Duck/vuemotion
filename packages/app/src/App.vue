<script setup lang="ts">
import Preview from './components/Preview.vue'
import Timeline from './components/Timeline.vue'
import Tools from './components/Tools.vue'
import TopMenubar from './components/TopMenubar.vue'
import Widgets from './components/Widgets.vue'
</script>

<template>
  <div class="w-screen h-screen">
    <TopMenubar />
    <div class="h-full w-full">
      <Preview :width="1600" :height="900" />
      <Tools />
      <div class="w-full h-full flex flex-row">
        <div class="w-[25%] h-full flex">
          <Widgets
            :widgets="[
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
              { type: 'Arc' },
            ]"
          />
        </div>
        <div class="w-[75%] h-full flex">
          <Timeline />
        </div>
      </div>
    </div>
  </div>
</template>
