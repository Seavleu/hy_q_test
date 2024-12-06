import moment from 'moment'
import type { Ref } from 'vue'

export const initChart = (chartConfig: Ref<any>) => {
  chartConfig.value.series = chartConfig.value.series || [{ data: [] }];
  chartConfig.value.xAxis = chartConfig.value.xAxis || { categories: [] };
};

export const setChartData = (
  chartConfig: Ref<any>,
  data: Array<any>,
  xKey: string,
  yKeys: string[]
) => {
  data.forEach((item) => {
    chartConfig.value.series.forEach((series: any, index: number) => {
      series.data.push(item[yKeys[index]] || 0)
    })
    chartConfig.value.xAxis.categories.push(item[xKey])
  })
}

export const toggleChartType = (chart: Ref<any>, type: 'line' | 'bar') => {
  if (!chart.value || !chart.value.series) {
    console.warn('Chart is not properly initialized');
    return;
  }
  const currentChartType = type === 'bar' ? 'column' : type;
  chart.value.series.forEach((series: any) => (series.type = currentChartType));
};

export const zoomChart = (
  chart: Ref<any>,
  factor: number
) => {
  chart.value.yAxis[0].max *= factor;
  chart.value.yAxis[0].min *= factor;
};


export const setDateRange = (type: number) => {
  const today = moment()
  const ranges = {
    1: { start: today.clone().subtract(1, 'days').toDate(), end: today.toDate() },
    2: { start: today.clone().subtract(7, 'days').toDate(), end: today.toDate() },
    3: { start: today.clone().subtract(1, 'months').toDate(), end: today.toDate() },
  }
  return ranges[type] || { start: today.toDate(), end: today.toDate() }
}