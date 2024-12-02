import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const layout = ref<'PublicLayout' | 'DefaultLayout'>('DefaultLayout')

  const setLayout = (newLayout: 'PublicLayout' | 'DefaultLayout') => {
    layout.value = newLayout
  }

  const getLayout = () => layout.value

  return { layout, setLayout, getLayout }
})
