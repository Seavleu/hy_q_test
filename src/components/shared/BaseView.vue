<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  pathDirection: {
    type: Array,
    required: true,
  },
})

const isActive = (path: string) => {
  const currentPath = window.location.pathname
  return currentPath === path
}
</script>

<template>
  <div class="box-com"> 
    <div class="tab-box">
      <ul>
        <li
          v-for="item in pathDirection"
          :key="item.path"
          :class="{ active: isActive(item.path) }"
        >
          <RouterLink :to="item.path">{{ item.title }}</RouterLink>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>
