<script setup lang="ts">
import Button from 'primevue/button'
import Panel from 'primevue/panel'
// import Select from 'primevue/select'
import type { Ref } from 'vue'
import { inject } from 'vue'

const playing = inject('playing') as Ref<boolean>
playing.value ??= false
</script>

<template>
  <div>
    <Panel
      class="w-full flex border flex-row justify-center" :style="{
        backgroundColor: 'var(--p-primary-color)',
        height: '2.35rem',
      }"
    >
      <Button
        class="h-10 flex items-center justify-center self-center" :style="{
          'margin-right': '0.5rem',
          'margin-left': '0.5rem',
        }"
      >
        <i class="pi pi-backward" />
      </Button>
      <Button
        class="h-10 flex items-center justify-center self-center" :style="{
          'margin-right': '0.5rem',
          'margin-left': '0.5rem',
        }"
      >
        <i class="pi pi-step-backward-alt" />
      </Button>
      <Button
        class="h-10 flex items-center justify-center self-center" :style="{
          'margin-right': '0.5rem',
          'margin-left': '0.5rem',
        }" @click="playing = !playing"
      >
        <i
          :class="{
            'pi pi-play': !playing,
            'pi pi-pause': playing,
          }"
        />
      </Button>
      <Button
        class="h-10 flex items-center justify-center self-center" :style="{
          'margin-right': '0.5rem',
          'margin-left': '0.5rem',
        }"
      >
        <i class="pi pi-step-forward-alt" />
      </Button>
      <Button
        class="h-10 flex items-center justify-center self-center" :style="{
          'margin-right': '0.5rem',
          'margin-left': '0.5rem',
        }"
      >
        <i class="pi pi-expand" />
      </Button>
      <!-- <Button class="h-10 flex items-center justify-center self-center">
        <Select v-model=""></Select>
      </Button> -->
    </Panel>
  </div>
</template>
