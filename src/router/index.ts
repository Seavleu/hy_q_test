import { useCookies } from 'vue3-cookies'
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from 'vue-router'
import { storeToRefs } from 'pinia'
import { routes } from './routes'
import { useLayoutStore } from '@/stores/layout'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash }
    } else {
      return { left: 0, top: 0 }
    }
  },
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const layoutStore = useLayoutStore()
    const userStore = useUserStore()
    const { cookies } = useCookies()

    layoutStore.setLayout(to.meta.isPublic ? 'PublicLayout' : 'DefaultLayout')

    if (to.meta.isPublic) {
      next()
    } else {
      const token = cookies.get('token')
      const userInfo = cookies.get('user_info')
      if (token && userInfo) {
        try {
          const parsedUserInfo =
            typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
          userStore.setUser({
            plant_seq: parsedUserInfo.plant_seq,
            plant_name: parsedUserInfo.plant_name,
            user_id: parsedUserInfo.user_id,
            user_seq: parsedUserInfo.user_seq,
          })
          next()
        } catch (error) {
          console.error('쿠키에서 사용자 정보 구문 분석 오류:', error)
          cookies.remove('token')
          cookies.remove('user_info')
          next('/auth')
        }
      } else {
        next('/auth')
      }
    }
  }
)

export default router
