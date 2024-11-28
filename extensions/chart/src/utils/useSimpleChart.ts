import { defineWidget } from "@vue-motion/core";
import type { Ref } from "vue";
import { inject, provide, ref, unref } from "vue";

import type {
  BaseSimpleChartData,
  BaseSimpleChartOptions,
} from "../widgets/baseSimpleChart.vue";
import type { ChartLayoutConfig } from "../widgets/chartLayout.vue";
import type { MixedChartData } from "../widgets/mixedChart.vue";

export function useSimpleChart<T extends BaseSimpleChartOptions>(props: T) {
  const options = defineWidget<T>(props);

  const mixedData = inject<Ref<MixedChartData[]>>(
    "mixedChartData",
    ref<MixedChartData[]>([]),
  );
  let data = inject<Ref<BaseSimpleChartData>>("chartData");
  if (!data) {
    data = ref<BaseSimpleChartData>({
      labels: (options as BaseSimpleChartOptions).labels,
      datasets: [],
    });
    mixedData.value.push({
      data: unref(data) as BaseSimpleChartData,
      options: options as BaseSimpleChartOptions,
    });
  }
  provide("chartData", data);
  let layoutConfig = inject<Ref<ChartLayoutConfig>>("chartLayoutConfig");
  if (layoutConfig) options.layout = true;
  else layoutConfig = ref<ChartLayoutConfig>({});
  provide("chartLayoutConfig", layoutConfig);

  data.value.style ??= {};
  data.value.style = {
    ...data?.value.style,
    ...options.style,
  };

  return {
    props,
    options: options as ReturnType<typeof defineWidget<T>>,
    data,
    layoutConfig,
  };
}
