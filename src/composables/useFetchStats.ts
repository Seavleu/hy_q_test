import { ref } from 'vue'
import moment from 'moment'
import type { InvalidCurrent } from '@/types/api'
import { GENERATION_API } from '@/lib/api'

export function useFetchStats(initialRange: { start: Date; end: Date }) {
  const range = ref(initialRange)
  const data = ref<any>(null)
  const isLoading = ref(false)

  const fetchStats = async () => {
    try {
      isLoading.value = true
      const params: InvalidCurrent = {
        plant_seq: 2,
        start_date: moment(range.value.start).format('YYYYMMDD'),
        end_date: moment(range.value.end).format('YYYYMMDD')
      }

      const { data: apiData } = await GENERATION_API.invalidCurrent(params)
      if (!apiData) {
        console.warn('API returned empty data')
        data.value = null
        return
      }
      data.value = apiData
    } catch (error) {
      console.error('Error fetching stats:', error)
      data.value = null
    } finally {
      isLoading.value = false
    }
  }
  return { range, data, isLoading, fetchStats }
}
