import { useCookies } from 'vue3-cookies'
import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import { routes } from './routes'
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ left: 0, top: 0 }) 
        }
      })
    })
  },
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const layoutStore = useLayoutStore()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const { cookies } = useCookies()

  layoutStore.setLayout(to.meta.isPublic ? 'LayoutPublic' : 'LayoutDefault')

  if (to.meta.isPublic) {
    next()
  } else {
    const token = cookies.get('token')
    const userInfo = cookies.get('user_info')
    if (token && userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo)
        userStore.setUser({
          plant_seq: parsedUserInfo.plant_seq,
          plant_name: parsedUserInfo.plant_name,
          user_id: parsedUserInfo.user_id,
          user_seq: parsedUserInfo.user_seq,
        })
        next()
      } catch (error) {
        console.error('Error parsing user info from cookies:', error)
        cookies.remove('token')
        cookies.remove('user_info')
        next('/auth') 
      }
    } else {
      next('/auth')
    }
  }
})

export default router
