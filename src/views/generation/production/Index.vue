<script setup lang="ts">
import { useRoute } from 'vue-router'
import './Index.scss'

const pathDirection = [
  {
    title: '현황',
    path: '/generation/production/Current'
  },
  {
    title: '통계차트',
    path: '/generation/production/Chart'
  }
]

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <div class="box-com">
    <div class="tab-box">
      <ul>
        <li
          v-for="item in pathDirection"
          :key="item.path"
          :class="{ active: isActive(item.path) }">
          <RouterLink :to="item.path">{{ item.title }}</RouterLink>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<style scoped src=""></style>