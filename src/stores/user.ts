import { ref } from 'vue'
import { defineStore } from 'pinia'
interface User {
  plant_seq: number
  plant_name: string
  user_id: string
  user_seq: number
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const setUser = (newUser: User) => {
    user.value = newUser
  }

  const clearUser = () => {
    user.value = null
  }

  return { user, setUser, clearUser }
})
