<template>
  <div>
    <Panel class="w-full flex border flex-row justify-center" :style="{
      backgroundColor: 'var(--p-primary-color)',
      height: '2.35rem'
    }">
      <Button class="h-10 flex items-center justify-center self-center" :style="{
        'margin-right': '0.5rem',
        'margin-left': '0.5rem',
      }">
        <i class="pi pi-backward"></i>
      </Button>
      <Button class="h-10 flex items-center justify-center self-center" :style="{
        'margin-right': '0.5rem',
        'margin-left': '0.5rem',
      }">
        <i class="pi pi-step-backward-alt"></i>
      </Button>
      <Button class="h-10 flex items-center justify-center self-center" :style="{
        'margin-right': '0.5rem',
        'margin-left': '0.5rem',
      }" @click="playing = !playing">
        <i :class="{
          'pi pi-play': !playing,
          'pi pi-pause': playing
        }"></i>
      </Button>
      <Button class="h-10 flex items-center justify-center self-center" :style="{
        'margin-right': '0.5rem',
        'margin-left': '0.5rem',
      }">
        <i class="pi pi-step-forward-alt"></i>
      </Button>
      <Button class="h-10 flex items-center justify-center self-center" :style="{
        'margin-right': '0.5rem',
        'margin-left': '0.5rem',
      }">
        <i class="pi pi-expand"></i>
      </Button>
      <!-- <Button class="h-10 flex items-center justify-center self-center">
        <Select v-model=""></Select>
      </Button> -->
    </Panel>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Panel from 'primevue/panel'
// import Select from 'primevue/select'
import { inject, Ref } from 'vue';

const playing = inject('playing') as Ref<boolean>
playing.value ??= false
</script>
