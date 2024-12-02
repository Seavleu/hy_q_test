import { defineStore } from 'pinia'
import { AUTH_API } from '@/lib/api'
import { useCookies } from 'vue3-cookies'
import { useUserStore } from './user'
import type { User } from '@/types/store'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const { cookies } = useCookies()
  const userStore = useUserStore()
  const router = useRouter()

  const login = async (userId: string, userPw: string): Promise<boolean> => {
    try {
      const res = await AUTH_API.login({ user_id: userId, user_pw: userPw })

      if (res.data?.token) {
        const { token, user_seq, plant_seq = 0, plant_name = '' } = res.data

        const userData: User = {
          user_id: userId,
          user_seq,
          plant_seq,
          plant_name,
        }

        // ** 7일 이내에 사용자 브라우저에서 쿠키 만료 ** //
        const cookieOptions = {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  
          secure: import.meta.env.PROD, // TODO: 프로덕션 환경에서만 보안 쿠키 사용
          sameSite: 'Strict', // 사이트 간 요청 위조 방지
        }

        cookies.set('token', token, cookieOptions)
        cookies.set('user_info', JSON.stringify(userData), cookieOptions)

        userStore.setUser(userData)

        router.push('/')

        return true
      } else {
        console.error('로그인 필수 입력란이 누락되었거나 PW/ID가 잘못되었습니다:', res.data)
        return false
      }
    } catch (error) {
      console.error('@/stores/auth 로그인에 오류가 발생했습니다:', error)
      return false
    }
  }

  const logout = (): void => {
    try {
      cookies.remove('token')
      cookies.remove('user_info')

      userStore.clearUser()

      router.push('/auth')
    } catch (error) {
      console.error('오류 로그아웃:', error)
    }
  }

  return { login, logout }
})
