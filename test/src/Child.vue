<script setup lang="ts">
import type { Ref } from 'vue'
import { inject, watch } from 'vue'

const e = inject('elapsed') as Ref<number>

watch(e, () => {
  console.log(e.value)
})
</script>

<template>
  <circle r="100" />
</template>
