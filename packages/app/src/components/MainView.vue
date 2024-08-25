<script setup lang="ts">
import WidgetsView from './WidgetsView.vue';
</script>

<template>
  <div class="flex flex-row w-full h-full">
    <div class="flex-grow-[3]">
      <WidgetsView :widgets="[
        {
          type: 'Circle'
        },
        {
          type: 'Arc'
        }
      ]"/>
    </div>
    <div class="flex-grow-[9]">
      <div class="flex flex-col w-full h-full">
        <div class="flex-grow-[7]">ww</div>
        <div class="flex-grow-[3]">ww</div>
      </div>
    </div>
  </div>
</template>