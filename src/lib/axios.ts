import axios from 'axios'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

axios.defaults.timeout = 10000
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['Authorization'] = cookies.get('token')
 
axios.interceptors.request.use(
  (config) => { 
    return config  
  },
  (error) => { 
    return Promise.reject(error.response)
  }
)
 
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('HTTP Response Error:', error.response || error.message)
    return Promise.reject(error.response || error.message)
  }
)

export default axios
