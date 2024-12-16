import { ref } from 'vue'

export function useFetchData(apiMethod: Function, params: Record<string, any>) {
  const data = ref<any>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchData = async (overrideParams: Record<string, any> = {}) => {
    try {
      isLoading.value = true
      const response = await apiMethod({ ...params, ...overrideParams })
      data.value = response.data || null
    } catch (err) {
      console.error('Error fetching data:', err)
      error.value = 'Failed to fetch data'
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, fetchData }
}
