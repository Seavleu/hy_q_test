<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path: string) => route.path === path

const tabData = route.meta.tabData || []
</script>

<template>
  <div class="box-com">
    <div class="tab-box">
      <ul>
        <li
          v-for="tab in tabData"
          :key="tab.path"
          :class="{ active: isActive(tab.path) }"
        >
          <RouterLink :to="tab.path">{{ tab.title }}</RouterLink>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>