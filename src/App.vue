<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/components/layouts/Default.vue'
import PublicLayout from '@/components/layouts/Public.vue'

type LayoutType = 'DefaultLayout' | 'PublicLayout'

const route = useRoute()

const CurrentLayout = computed(() => {
  const layout = (route.meta.layout as LayoutType) || 'DefaultLayout'
  return layout === 'PublicLayout' ? PublicLayout : DefaultLayout
})

</script>

<template>
  <component :is="CurrentLayout">
    <router-view />
  </component>
</template>
