import { defineStore } from 'pinia'
import { AUTH_API } from '@/lib/api'
import { useCookies } from 'vue3-cookies'
import { useUserStore } from './user'
import type { User } from '@/types/store'

export const useAuthStore = defineStore('auth', () => {
  const { cookies } = useCookies()
  const userStore = useUserStore()

  const login = async (userId: string, userPw: string): Promise<boolean> => {
    try {
      const res = await AUTH_API.login({
        user_id: userId,
        user_pw: userPw,
      })

      if (res.data) {
        const { token, user_seq, plant_seq = 0, plant_name = '' } = res.data

        const userData: User = {
          user_id: userId,
          user_seq,
          plant_seq,
          plant_name,
        }
        
        const cookieOptions = {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days in milliseconds
          secure: true,
          sameSite: 'Strict',
        }

        cookies.set('token', token, cookieOptions)
        cookies.set('user_info', JSON.stringify(userData), cookieOptions)
        userStore.setUser(userData)

        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Login Error:', error)
      return false
    }
  }

  const logout = (): void => {
    cookies.remove('token')
    cookies.remove('user_info')
    userStore.clearUser()
  }

  return { login, logout }
})
