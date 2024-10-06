<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import type { Growable } from '@vue-motion/lib'
import type { BaseSimpleChartOptions } from './baseSimpleChart.vue'
import BaseSimpleChart from './baseSimpleChart.vue'
import { useSimpleChart } from './utils/useSimpleChart.ts'
import type { BaseChartStyle, Color } from '.'
import { ColorEnum, DataUtil } from '.'

/**
 * BarChart style.
 * @public
 * @interface
 * @category BarChart
 * @property borderRadius - The border radius of the bar. Default is 0. Not supported yet.
 */
export interface BarChartStyle extends BaseChartStyle {
  borderRadius?: number
}

export interface BarChartOptions extends BaseSimpleChartOptions, Growable {
  categoryPercentage?: number
  barPercentage?: number
}

const props = withDefaults(defineProps<BarChartOptions>(), {
  gridAlign: true,
  categoryPercentage: 0.8,
  barPercentage: 0.8,
})
const {
  options,
  data,
  layoutConfig,
} = useSimpleChart<BarChartOptions>(props)

const barSets = ref<{
  width: number
  height: number
  x: number
  y: number
  style: {
    fillColor: Color
    borderColor: Color
    borderWidth: number
    radius: number
  }
}[][]>([])

onMounted(() => {
  watchEffect(() => {
    barSets.value = data.value.datasets.map((set, setIndex) => {
      set.style ??= {}
      set.style.backgroundColor ??= data.value.style?.backgroundColor ?? ColorEnum.WHITE
      set.style.borderColor ??= data.value.style?.borderColor ?? ColorEnum.WHITE
      set.style.borderWidth ??= data.value.style?.borderWidth ?? 1
      set.style.borderRadius ??= data.value.style?.borderRadius ?? 0

      if (layoutConfig.value.indexAxis === 'x') {
        return set.data.map((unit) => {
          const gridSize = (DataUtil.indexDuration(unit) ?? layoutConfig.value.index!.interval)
            / (layoutConfig.value.index!.max - layoutConfig.value.index!.min) * layoutConfig.value.width!
          const categorySize = gridSize * options.categoryPercentage!
          const barSize = (categorySize / data.value.datasets.length) * options.barPercentage!

          return {
            width: barSize,
            height: -unit.cross * (options.progress ?? 1) * layoutConfig.value.height!
              / (layoutConfig.value.cross!.max - layoutConfig.value.cross!.min),
            x: (DataUtil.indexNumber(unit) - (DataUtil.indexDuration(unit) ?? layoutConfig.value.index!.interval) / 2 - layoutConfig.value.index!.min)
              / (layoutConfig.value.index!.max - layoutConfig.value.index!.min) * layoutConfig.value.width!
              + (gridSize - categorySize) / 2 + (setIndex * categorySize) / data.value.datasets.length
              + (categorySize / data.value.datasets.length - barSize) / 2,
            y: layoutConfig.value.height! - (0 - layoutConfig.value.cross!.min)
            / (layoutConfig.value.cross!.max - layoutConfig.value.cross!.min) * layoutConfig.value.height!,
            style: {
              fillColor: unit.style?.backgroundColor ?? set.style!.backgroundColor!,
              borderColor: unit.style?.borderColor ?? set.style!.borderColor!,
              borderWidth: unit.style?.borderWidth ?? set.style!.borderWidth!,
              radius: unit.style?.borderRadius ?? set.style!.borderRadius!,
            },
          }
        })
      }
      else {
        return set.data.map((unit) => {
          const gridSize = (DataUtil.indexDuration(unit) ?? layoutConfig.value.index!.interval)
            / (layoutConfig.value.index!.max - layoutConfig.value.index!.min) * layoutConfig.value.height!
          const categorySize = gridSize * options.categoryPercentage!
          const barSize = (categorySize / data.value.datasets.length) * options.barPercentage!
          return {
            width: unit.cross * (options.progress ?? 1) * layoutConfig.value.width!
              / (layoutConfig.value.cross!.max - layoutConfig.value.cross!.min),
            height: barSize,
            x: (0 - layoutConfig.value.cross!.min) / (layoutConfig.value.cross!.max - layoutConfig.value.cross!.min) * layoutConfig.value.width!,
            y: (DataUtil.indexNumber(unit) - (DataUtil.indexDuration(unit) ?? layoutConfig.value.index!.interval) / 2 - layoutConfig.value.index!.min)
              / (layoutConfig.value.index!.max - layoutConfig.value.index!.min) * layoutConfig.value.height!
              + (gridSize - categorySize) / 2
              + (setIndex * categorySize) / data.value.datasets.length
              + (categorySize / data.value.datasets.length - barSize) / 2,
            style: {
              fillColor: unit.style?.backgroundColor ?? set.style!.backgroundColor!,
              borderColor: unit.style?.borderColor ?? set.style!.borderColor!,
              borderWidth: unit.style?.borderWidth ?? set.style!.borderWidth!,
              radius: unit.style?.borderRadius ?? set.style!.borderRadius!,
            },
          }
        })
      }
    })
  })
})
</script>

<template>
  <BaseSimpleChart
    v-bind="{
      gridAlign: true,
      edgeOffset: !(options.gridAlign),
      ...options,
    }"
  >
    <slot />
    <!-- BarSets -->
    <g v-for="(barSet, setIndex) in barSets" :key="setIndex">
      <g v-for="(bar, barIndex) in barSet" :key="barIndex">
        <rect
          :x="bar.x"
          :y="bar.height < 0 ? bar.y + bar.height : bar.y"
          :width="bar.width"
          :height="bar.height < 0 ? -bar.height : bar.height"
          :fill="bar.style.fillColor"
          fill-opacity="0.2"
          :stroke="bar.style.borderColor"
          :stroke-width="bar.style.borderWidth"
          :rx="bar.style.radius"
        />
      </g>
    </g>
  </BaseSimpleChart>
</template>

<style scoped>

</style>
