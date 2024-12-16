import { ref, watch } from 'vue'
import moment from 'moment'
import chartJson from '@/assets/json/charts/production/powerInvalidChart.json'
import { initChart, setChartData, toggleChartType, zoomChart } from '@/utils/charts'

interface ChartStatParams {
  plant_seq: number
  start_date: string
  end_date: string
  device_id?: number
}

export function useFetchStats(apiMethod: (params: ChartStatParams) => Promise<any>) {
  const range = ref({ start: new Date(), end: new Date() })
  const toggleNone = ref(1)
  const chartType = ref<'line' | 'bar'>('line')
  const invert = ref(0)
  const data = ref<any>({ hourly_gen_list: [], invert_report_list: {} })
  const isLoading = ref(false)

  const chart = ref({ ...chartJson })  
  const invertList = ref([{ title: '전체', value: 0 }])

  // Fetch Data and Set Chart
  const fetchChartStats = async () => {
    try {
      isLoading.value = true
      const params: ChartStatParams = {
        plant_seq: 2,
        start_date: moment(range.value.start).format('YYYYMMDD'),
        end_date: moment(range.value.end).format('YYYYMMDD'),
        ...(invert.value !== 0 && { device_id: data.value?.invert_report_list?.device_id }),
      }

      const response = await apiMethod(params)
      if (!response?.data) {
        console.warn('No data available')
        data.value = { hourly_gen_list: [], invert_report_list: {} }
        return
      }

      data.value = response.data

      // Update invert list dynamically
      const deviceName = data.value.invert_report_list?.device_name
      if (deviceName && !invertList.value.some((i) => i.title === deviceName)) {
        invertList.value.push({ title: deviceName, value: 1 })
      }

      // Update chart data
      updateChart(data.value.hourly_gen_list)
    } catch (error) {
      console.error('Error fetching chart stats:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Update Chart
  const updateChart = (graphData: any[] = []) => {
    initChart(chart)  
    setChartData(chart, graphData, 'time_hour', ['gen_power', 'trans_power', 'invalid_power']) // Update series
  }

  // Chart Type Toggle
  const toggleChartTypeHandler = (type: 'line' | 'bar') => {
    chartType.value = type
    toggleChartType(chart, type)
  }

  // Chart Zoom
  const zoomIn = () => zoomChart(chart, 0.8)
  const zoomOut = () => zoomChart(chart, 1.2)

  // Date Range Setter
  const setDateRange = (type: number) => {
    const today = moment()
    const ranges: Record<number, { start: Date; end: Date }> = {
      1: { start: today.clone().subtract(1, 'days').toDate(), end: today.toDate() },
      2: { start: today.clone().subtract(7, 'days').toDate(), end: today.toDate() },
      3: { start: today.clone().subtract(1, 'months').toDate(), end: today.toDate() },
    }
    range.value = ranges[type] || { start: today.toDate(), end: today.toDate() }
  }

  watch(range, fetchChartStats, { deep: true })
  watch(invert, fetchChartStats)
  watch(toggleNone, (newVal) => {
    if (newVal !== 4) setDateRange(newVal)
  })

  return {
    range,
    toggleNone,
    chartType,
    invert,
    chart,
    data,
    isLoading,
    invertList,
    fetchChartStats,
    toggleChartTypeHandler,
    zoomIn,
    zoomOut,
  }
}
