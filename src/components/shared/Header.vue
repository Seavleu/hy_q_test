<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { useAuthStore } from '@/stores/auth'
import { images } from '@/constants'

const router = useRouter()
const route = useRoute()
const { cookies } = useCookies()
const authStore = useAuthStore()

const navItems = computed(
  () =>
    router.options.routes.find((route) => route.name === 'sub')?.children || []
)

const userInfo = computed(() => {
  const userCookie = cookies.get('user_info')
  if (typeof userCookie === 'string') {
    try {
      return JSON.parse(userCookie)
    } catch {
      return null
    }
  }
  return null
})

const logout = () => {
  authStore.logout()
  router.push('/auth')
}

const isActive = (itemPath) => {
  const currentPath = route.path
  return currentPath === itemPath || currentPath.startsWith(itemPath)
}
</script>

<template>
  <header id="header">
    <h1>
      <RouterLink to="/">
        <img :src="images.logo" alt="Hy-Q" />
      </RouterLink>
    </h1>
    <nav id="nav">
      <ul>
        <li
          v-for="item in navItems"
          :key="item.path"
          :class="{ active: isActive(item.path) }">
          <RouterLink :to="item.path">{{ item.meta?.title }}</RouterLink>
        </li>
      </ul>
    </nav>
    <div class="side">
      <div class="user-info" v-if="userInfo">
        {{ userInfo.plant_name }}
      </div>
      <div class="btn-member">
        <a class="ico-box setting" @click="router.push('/setting/device')"
          >설정</a
        >
        <a class="ico-box logout" @click="logout">로그아웃</a>
      </div>
    </div>
  </header>
</template>
