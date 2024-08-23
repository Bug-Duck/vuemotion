<template>
  <circle r="100"></circle>
</template>

<script setup lang="ts">
import { defineProps, inject, Ref, watch } from 'vue'

const e = inject('elapsed') as Ref<number>

watch(e, () => {
  console.log(e.value);
})
</script>