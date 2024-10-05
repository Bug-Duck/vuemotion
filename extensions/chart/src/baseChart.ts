import type { DateTimeUnit } from 'luxon'
import { DateTime } from 'luxon'
import type { WidgetOptions } from '@vue-motion/lib'
import type { ReturnWidget } from '@vue-motion/core'
import type { ChartLayoutConfig } from './chartLayout.vue'
import type { BarChartStyle, ChartDataOptions, DateTimeWithDuration } from '.'
// import type { default as ChartLayout } from './chartLayout'
// import type { ChartDataUnit } from './chartDataUnit'

export type Color = string

export class ColorEnum {
  static readonly WHITE = 'white'
  static readonly BLACK = 'black'
  static readonly RED = 'red'
  static readonly GREEN = 'green'
  static readonly BLUE = 'blue'
  static readonly YELLOW = 'yellow'
  static readonly CYAN = 'cyan'
  static readonly MAGENTA = 'magenta'
  static readonly GRAY = 'gray'
  static readonly LIGHT_GRAY = 'lightGray'
  static readonly DARK_GRAY = 'darkGray'
}

export type ChartStyle = BaseChartStyle & BarChartStyle

/**
 * ChartAxisOptions
 * @interface
 * @category General
 * @description
 * ChartAxisOptions is an interface that defines the options of an axis in a chart.
 */
export interface ChartAxisOptions extends WidgetOptions {
  /**
   * @property number beginAtZero
   * @description
   * beginAtZero is a boolean that represents whether the axis begins at zero.
   * It is optional.
   * If not provided, the beginAtZero will be `true`.
   */
  beginAtZero?: boolean
  /**
   * @property number suggestedMin
   * @description
   * suggestedMin is a number that represents the suggested minimum value of the axis.
   * If no data below the suggestedMin, the axis will begin at the suggestedMin.
   * It is optional.
   * If not provided, the suggestedMin will be `0` when `beginAtZero` is `true` and `undefined` when `beginAtZero` is `false`.
   */
  suggestedMin?: number | DateTime
  /**
   * @property number suggestedMax
   * @description
   * suggestedMax is a number that represents the suggested maximum value of the axis.
   * If no data above the suggestedMax, the axis will end at the suggestedMax.
   * It is optional.
   * If not provided, the suggestedMax will be `undefined`.
   */
  suggestedMax?: number | DateTime
  /**
   * @property Color girdColor
   * @description
   * gridColor is a color that represents the color of the grid lines.
   * It is optional.
   * If not provided, the gridColor will be `Color.WHITE`.
   */
  gridColor?: Color
  /**
   * @property number gridWidth
   * @description
   * gridWidth is a number that represents the width of the grid lines.
   * It is optional.
   * If not provided, the gridWidth will be `1`.
   */
  gridWidth?: number
}

/**
 * DateTimeFormatOptions
 * @interface
 * @category General
 * @description
 * DateTimeFormatOptions is an interface that defines the options of the date time format.
 */
export interface DateTimeFormatOptions {
  year: 'year'
  quarter: 'quarter'
  month: 'month' | 'monthShort' | 'monthLong'
  week: 'weekNumber'
  day: 'day' | 'weekday' | 'localWeekNumber' | 'weekdayLong' | 'weekdayShort' | 'ordinal'
  hour: 'hour'
  minute: 'minute'
  second: 'second'
  millisecond: 'millisecond'
}

/**
 * BaseChartOptions
 * @interface
 * @category General
 * @description
 * BaseChartOptions is an interface that defines the options of a chart.
 */
export interface BaseChartOptions extends ChartAxisOptions {
  /**
   * @property 'x' | 'y' indexAxis
   * @description
   * indexAxis is a string that represents the index-axis of the chart.
   * It is optional.
   * If not provided, the index-axis will be 'x'.
   */
  indexAxis?: 'x' | 'y'
  /**
   * @property 'number' | 'label' | 'date' indexType
   * @description
   * indexType is a string that represents the type of the index-axis.
   * To be noted that the indexType can't be mixed in a chart.
   * It is optional.
   * If not provided, the indexType will be 'label' when labels are provided as strings,
   * 'date' when labels are provided as DateTimes or {@link ChartDataUnit#isIndexDate} are DateTimes.
   * and 'number' when {@link ChartDataUnit#isIndexDate} are not DateTimes.
   */
  indexType?: 'label' | 'number' | 'date'
  /**
   * @property DateTimeUnit indexIntervalUnit
   * @description
   * indexIntervalUnit is a string that represents the interval unit of the index-axis.
   * To be noted that the indexIntervalUnit only works when the indexType is 'date'.
   * It is optional.
   * If not provided, the indexIntervalUnit will be generated automatically.
   */
  indexIntervalUnit?: DateTimeUnit
  /**
   * @property DateTimeFormatOptions dateFormatOptions
   * @description
   * dateFormatOptions is an object that defines the options of the date time format.
   */
  dateFormatOptions?: DateTimeFormatOptions
  /**
   * @property object axis
   * @description
   * axis is an object that defines the options of the axes in the chart.
   */
  axis?: {
    /**
     * @property ChartAxisOptions index
     * @description
     * index is an object that defines the options of the index-axis in the chart.
     */
    index?: ChartAxisOptions
    /**
     * @property ChartAxisOptions cross
     * @description
     * cross is an object that defines the options of the cross-axis in the chart.
     */
    cross?: ChartAxisOptions
  }
  /**
   * @property number width
   * @description
   * width is a number that represents the width of the chart.
   * To be noted that the width is the width of chart layout (excluding label, legend, etc.).
   */
  width?: number
  /**
   * @property number height
   * @description
   * height is a number that represents the height of the chart.
   * To be noted that the height is the height of chart layout (excluding label, legend, etc.).
   */
  height?: number
  /**
   * @property boolean gridAlign
   * @description
   * gridAlign is a boolean that represents whether the grid labels are aligned with the grid or line&ticks.
   * It is optional.
   * If not provided, the gridAlign will be `true` for `BarChart` and `false` for other types.
   */
  gridAlign?: boolean
  /**
   * @property boolean edgeOffset
   * @description
   * edgeOffset is a boolean that represents whether the chart has an edge offset which is half of the interval.
   * It is optional.
   * If not provided, the edgeOffset will be `false` when `gridAlign` is `true` and `true` when `gridAlign` is `false`.
   */
  edgeOffset?: boolean
  /**
   * @property ChartLayout layout
   * @description
   * layout is an object that defines the layout of the chart.
   * To be noted that when the layout is provided, the size of the chart will be ignored, and the layout will be used to calculate the size.
   * What's more, the layout **won't** be added as child of the chart, which means the layout should be added to the scene manually.
   * It is optional.
   * If not provided, the layout will be generated automatically.
   */
  layout?: ChartLayoutConfig
}

/**
 * BaseChartStyle
 * @interface
 * @category General
 * @description
 * BaseChartStyle is an interface that defines the style of a chart.
 */
export interface BaseChartStyle {
  /**
   * @property Color backgroundColor
   * @description
   * backgroundColor is a color that represents the background color of the dataUnit, which may be displayed in various forms.
   * It is optional.
   */
  backgroundColor?: Color
  /**
   * @property Shader backgroundShader
   * @description
   * backgroundShader is a shader that represents the background shader of the dataUnit, which may be displayed in various forms.
   * It is optional.
   */
  // backgroundShader?: Shader
  /**
   * @property boolean border
   * @description
   * border is a boolean that represents whether the dataUnit has a border.
   */
  border?: boolean
  /**
   * @property Color borderColor
   * @description
   * borderColor is a color that represents the border color of the dataUnit, which may be displayed in various forms.
   * It is optional.
   */
  borderColor?: Color
  /**
   * @property Shader borderShader
   * @description
   * borderShader is a shader that represents the border shader of the dataUnit, which may be displayed in various forms.
   * It is optional.
   */
  // borderShader?: Shader
  /**
   * @property number borderWidth
   * @description
   * borderWidth is a number that represents the border width of the dataUnit, which may be displayed in various forms.
   * It is optional.
   */
  borderWidth?: number
}

export const DataUtil = {
  indexNumber(ChartDataOption: ReturnWidget<ChartDataOptions>): number {
    if (!(ChartDataOption.index instanceof DateTime)) {
      return ChartDataOption.index as number
    }
    else {
      const date = ChartDataOption.index as DateTime
      if (!ChartDataOption.intervalUnit)
        throw new Error('Interval unit is not set')
      const start = date.startOf(ChartDataOption.intervalUnit)
      const end = date.endOf(ChartDataOption.intervalUnit)
      if (ChartDataOption.intervalUnit !== 'week')
        return start.get(ChartDataOption.intervalUnit) + date.diff(start).as('milliseconds') / (end.diff(start).as('milliseconds'))
      else
        return start.get('weekNumber') + date.diff(start).as('milliseconds') / (end.diff(start).as('milliseconds'))
    }
  },

  indexDate(ChartDataOption: ReturnWidget<ChartDataOptions>) {
    return ChartDataOption.index as DateTime
  },

  indexDuration(ChartDataOption: ReturnWidget<ChartDataOptions>): number {
    if (!(ChartDataOption.index instanceof DateTime))
      return undefined
    if (!ChartDataOption.intervalUnit)
      throw new Error('Interval unit is not set')
    return (ChartDataOption.index as DateTimeWithDuration).duration!.as(ChartDataOption.intervalUnit)
  },

  isIndexDate(ChartDataOption: ReturnWidget<ChartDataOptions>) {
    return ChartDataOption.index instanceof DateTime
  },
}
