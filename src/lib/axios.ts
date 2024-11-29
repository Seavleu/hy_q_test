import axios from 'axios'
import { useCookies } from 'vue3-cookies' 
import { useLoaderStore } from '@/stores/loader'

const { cookies } = useCookies()

axios.defaults.timeout = 10000
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['Authorization'] = cookies.get('token')
 
axios.interceptors.request.use(
  (config) => { 
    const loaderStore = useLoaderStore()
    loaderStore.startLoading()
    return config  
  },
  (error) => { 
    const loaderStore = useLoaderStore()
    loaderStore.stopLoading()
    return Promise.reject(error.response)
  }
)
 
axios.interceptors.response.use(
  (response) => {
    const loaderStore = useLoaderStore()
    loaderStore.stopLoading()
    return response.data
  },
  (error) => {
    const loaderStore = useLoaderStore()
    loaderStore.stopLoading()
    console.error('HTTP Response Error:', error.response || error.message)
    return Promise.reject(error.response || error.message)
  }
)

export default axios
