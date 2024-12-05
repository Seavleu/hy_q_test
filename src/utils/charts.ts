import type { Ref } from 'vue'

export const initChart = (chartConfig: Ref<any>) => {
  chartConfig.value.series.forEach((series: any) => (series.data = []))
  chartConfig.value.xAxis.categories = []
}

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
