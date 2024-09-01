<script setup lang="ts">
import { defineWidget } from '@vue-motion/core'
import { figure } from '@vue-motion/lib'
import { BaseTableOptions } from './base-table'

const props = defineProps<BaseTableOptions>()
const options = defineWidget<BaseTableOptions>(props)

</script>

<template>
  <g v-bind="figure(options)">
    <foreignObjects>
      <table>
        <slot></slot>
      </table>
    </foreignObjects>
  </g>
</template>
