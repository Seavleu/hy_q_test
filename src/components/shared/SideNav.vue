<script setup lang="ts"> 
import { useRoute, RouterLink } from 'vue-router'

interface RouteMeta {
  title: string
  path?: string
  sideClass?: string
}

interface RouteRecord {
  path: string
  meta: RouteMeta
  children?: RouteRecord[]
}

const props = defineProps<{
  sideInfo: RouteRecord
}>()

const route = useRoute()

const isActive = (itemPath: string) => {
  return route.path === itemPath || route.path.includes(itemPath)
}
</script>

<template>
  <nav class="nav-side">
    <h2>{{ sideInfo.meta.title }}</h2>
    <ul :class="sideInfo.meta.sideClass">
      <li
        v-for="item in sideInfo.children"
        :key="item.path"
        :class="{ active: isActive(item.path) }">
        <RouterLink :to="item.path">{{ item.meta.title }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>
