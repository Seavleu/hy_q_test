<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, RouterView } from 'vue-router'
import { useLoaderStore } from '@/stores/loader'
import { Header, Footer, SideNav } from '@/components/shared'

const route = useRoute()
const { isLoading } = storeToRefs(useLoaderStore())

const sideInfo = ref<null | any>(null)

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      const currentRoute = route.matched[1]
      sideInfo.value =
        currentRoute &&
        currentRoute.children &&
        currentRoute.children.length > 0
          ? currentRoute
          : null
    }
  }
)
</script>

<template>
  <Header />

  <div v-if="isLoading" class="loader-skeleton">
    <v-progress-circular indeterminate :size="50" />
  </div>

  <div id="wrapper">
    <div id="containing" :class="{ 'full-page': !sideInfo }">
      <SideNav v-if="sideInfo" :key="route.fullPath" :side-info="sideInfo" />
      <div class="content">
        <RouterView :key="route.fullPath" />
      </div>
    </div>
  </div>

  <Footer />
</template>
