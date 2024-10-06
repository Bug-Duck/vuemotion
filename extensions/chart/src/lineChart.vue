<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import type { BaseSimpleChartOptions } from './baseSimpleChart.vue'
import BaseSimpleChart from './baseSimpleChart.vue'
import { useSimpleChart } from './utils/useSimpleChart.ts'
import { bezierControlPoints } from './utils/bezierControlPoints.ts'
import type { BaseChartStyle, Color } from '.'
import { ColorEnum, DataUtil } from '.'

/**
 * LineChart style.
 * @public
 * @interface
 * @category LineChart
 * @extends BaseChartStyle
 */
export interface LineChartStyle extends BaseChartStyle {
  /**
   * @property number dotSize
   * @description
   * dotSize is a number that represents the size of the dots in the line chart.
   * It is optional.
   * If not provided, the dotSize will be `5`.
   */
  dotSize?: number
  /**
   * @property number[] borderDashInterval
   * @description
   * borderDashInterval is an array of numbers that represents the intervals of the dashed border.
   * It is optional.
   * If not provided, the borderDashInterval will be `undefined`.
   */
  borderDashInterval?: number[]
  /**
   * @property number borderDashOffset
   * @description
   * borderDashOffset is a number that represents the offset of the dashed border.
   * It is optional.
   * If not provided, the borderDashOffset will be `0`.
   */
  borderDashOffset?: number
  /**
   * @property StrokeJoin borderJoinStyle
   * @description
   * borderJoinStyle is a string that represents the style of the border join.
   * It is optional.
   * If not provided, the borderJoinStyle will be `miter`.
   */
  // borderJoinStyle?: StrokeJoin
  /**
   * @property StrokeCap borderCapStyle
   * @description
   * borderCapStyle is a string that represents the style of the border cap.
   * It is optional.
   * If not provided, the borderCapStyle will be `butt`.
   */
  // borderCapStyle?: StrokeCap
  /**
   * @property number lineWidth
   * @description
   * lineWidth is a number that represents the width of the line in the line chart.
   * It is optional.
   * If not provided, the lineWidth will be `3`.
   */
  lineWidth?: number
  /**
   * @property number tension
   * @description
   * tension is a number that represents the tension of the line in the line chart, which is used to create a Bézier curve.
   * It is optional.
   * If not provided, the tension will be `0.1`.
   */
  tension?: number
  /**
   * @property boolean showLine
   * @description
   * showLine is a boolean that represents whether to show the line in the line chart.
   * It is optional.
   * If not provided, the showLine will be `true`.
   */
  showLine?: boolean
  /**
   * @property boolean animateIndex
   * @description
   * animateIndex is a boolean that represents whether to add animation to the index value of the data points in the line chart.
   * It is optional.
   * If not provided, the animateIndex will be `false`.
   */
  animateIndex?: boolean
}

export interface LineChartOptions extends BaseSimpleChartOptions {
}

const props = withDefaults(defineProps<LineChartOptions>(), {
  gridAlign: undefined,
})
const {
  options,
  data,
  layoutConfig,
} = useSimpleChart<LineChartOptions>(props)

const dotSets = ref<{
  radius: number
  x: number
  y: number
  style: {
    fillColor: Color
    borderColor: Color
    borderWidth: number
  }
}[][]>([])

const paths = ref<string[]>([])

onMounted(() => {
  watchEffect(() => {
    if (!layoutConfig.value.done)
      return
    if (data.value.datasets.length === 0)
      return
    if (data.value.datasets.some(dataset => (dataset.data.length === 0)))
      return

    dotSets.value = data.value.datasets.map((set) => {
      set.style ??= {}
      set.style.backgroundColor ??= data.value.style?.backgroundColor ?? ColorEnum.WHITE
      set.style.borderColor ??= data.value.style?.borderColor ?? ColorEnum.WHITE
      set.style.borderWidth ??= data.value.style?.borderWidth ?? 1
      set.style.dotSize ??= data.value.style?.dotSize ?? 5
      if (layoutConfig.value.indexAxis === 'x') {
        return set.data.map((unit) => {
          return {
            radius: unit.weight ?? unit.style?.dotSize ?? set.style!.dotSize!,
            x: (DataUtil.indexNumber(unit) - layoutConfig.value.index!.min)
              / (layoutConfig.value.index!.max - layoutConfig.value.index!.min) * layoutConfig.value.width!,
            y: layoutConfig.value.height!
              - ((unit.cross * (options.progress ?? 1) - layoutConfig.value.cross!.min) * layoutConfig.value.height!)
              / (layoutConfig.value.cross!.max - layoutConfig.value.cross!.min),
            style: {
              fillColor: unit.style?.backgroundColor ?? set.style!.backgroundColor!,
              borderColor: unit.style?.borderColor ?? set.style!.borderColor!,
              borderWidth: unit.style?.borderWidth ?? set.style!.borderWidth!,
            },
          }
        })
      }
      else {
        return set.data.map((unit) => {
          return {
            radius: unit.weight ?? unit.style?.dotSize ?? set.style!.dotSize!,
            x: ((unit.cross * (options.progress ?? 1) - layoutConfig.value.cross!.min) * layoutConfig.value.width!)
              / (layoutConfig.value.cross!.max - layoutConfig.value.cross!.min),
            y: layoutConfig.value.height! - (DataUtil.indexNumber(unit) - layoutConfig.value.index!.min)
            / (layoutConfig.value.index!.max - layoutConfig.value.index!.min) * layoutConfig.value.height!,
            style: {
              fillColor: unit.style?.backgroundColor ?? set.style!.backgroundColor!,
              borderColor: unit.style?.borderColor ?? set.style!.borderColor!,
              borderWidth: unit.style?.borderWidth ?? set.style!.borderWidth!,
            },
          }
        })
      }
    })

    for (let i = 0; i < data.value.datasets.length; i++) {
      const tension = data.value.datasets[i].style?.tension ?? data.value.style?.tension ?? 0.1
      paths.value[i] = ''
      const controlPoints = bezierControlPoints(dotSets.value[i], tension, false)
      for (let j = 0; j < dotSets.value[i].length; j++) {
        if (j === 0) {
          paths.value[i] += `M ${dotSets.value[i][j].x} ${dotSets.value[i][j].y} `
        }
        else {
          paths.value[i] += `C ${controlPoints[j - 1].next.x} ${controlPoints[j - 1].next.y} ${controlPoints[j].previous.x} ${controlPoints[j].previous.y} ${dotSets.value[i][j].x} ${dotSets.value[i][j].y} `
          // this.paths[i].lineTo(this.dotSets[i][j].x, this.dotSets[i][j].y)
        }
      }
    }
  })
})
</script>

<template>
  <BaseSimpleChart
    v-bind="{
      gridAlign: false,
      edgeOffset: !(options.gridAlign),
      ...options,
    }"
  >
    <slot />
    <!-- DotSets -->
    <g v-for="(dotSet, setIndex) in dotSets" :key="setIndex">
      <g v-for="(dot, dotIndex) in dotSet" :key="dotIndex">
        <circle
          :cx="dot.x"
          :cy="dot.y"
          :r="dot.radius"
          :fill="dot.style.fillColor"
          fill-opacity="0.2"
          :stroke="dot.style.borderColor"
          :stroke-width="dot.style.borderWidth"
        />
      </g>
    </g>
    <!-- Paths -->
    <g v-if="data.style?.showLine ?? true">
      <path
        v-for="(path, pathIndex) in paths"
        :key="pathIndex"
        :d="path"
        fill-opacity="0"
        :stroke="data.datasets[pathIndex].style?.borderColor ?? data.datasets[pathIndex].data[0].style?.borderColor ?? data.style?.borderColor ?? ColorEnum.WHITE"
        :stroke-width="data.datasets[pathIndex].style?.borderWidth ?? data.datasets[pathIndex].data[0].style?.borderWidth ?? data.style?.borderWidth ?? 1"
        :stroke-dasharray="data.datasets[pathIndex].style?.borderDashInterval?.join(' ') ?? data.datasets[pathIndex].data[0].style?.borderDashInterval?.join(' ') ?? data.style?.borderDashInterval?.join(' ')"
        :stroke-dashoffset="data.datasets[pathIndex].style?.borderDashOffset ?? data.datasets[pathIndex].data[0].style?.borderDashOffset ?? data.style?.borderDashOffset ?? 0"
      />
    </g>
  </BaseSimpleChart>
</template>

<style scoped>

</style>
