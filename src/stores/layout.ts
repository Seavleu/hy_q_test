import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const layout = ref<'LayoutPublic' | 'LayoutDefault'>('LayoutDefault')

  const setLayout = (newLayout: 'LayoutPublic' | 'LayoutDefault') => {
    layout.value = newLayout
  }

  const getLayout = () => layout.value

  return { layout, setLayout, getLayout }
})
