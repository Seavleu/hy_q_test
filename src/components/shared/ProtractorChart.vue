<script setup lang="ts">
import { computed } from 'vue'
import '@/assets/styles/protractor.scss'

interface Props {
  title: string
  value: string | number
  unit: string
}

const props = defineProps<Props>()
const rotateVal = computed(() => Math.min(Math.max(Number(props.value), 0), 100))

const rotateStyle = computed(() => {
  const angle = 180 + rotateVal.value * 1.8
  const background = getGradient(rotateVal.value)

  return {
    transform: `rotate(${angle}deg)`,
    background,
  }
})

const getGradient = (value: number): string => {
  const gradients = [
    { min: 1, max: 20, gradient: 'conic-gradient(from 180deg, #0a99ff 100%, #ffe205 90%)' },
    { min: 20, max: 25, gradient: 'conic-gradient(from 180deg, #0a99ff 80%, #ffe205 85%)' },
    { min: 25, max: 30, gradient: 'conic-gradient(from 180deg, #0a99ff 60%, #ffe205 80%)' },
    { min: 30, max: 50, gradient: 'conic-gradient(from 180deg, #0a99ff 50%, #ffe205 80%)' },
    { min: 50, max: 70, gradient: 'conic-gradient(from 180deg, #0a99ff 50%, #ffe205 75%)' },
    { min: 70, max: 80, gradient: 'conic-gradient(from 180deg, #0a99ff 40%, #ffe205 75%)' },
    { min: 80, max: 90, gradient: 'conic-gradient(from 180deg, #0a99ff 30%, #ffe205 70%, #e94003 75%)' },
    { min: 90, max: 100, gradient: 'conic-gradient(from 180deg, #0a99ff 30%, #ffe205 65%, #e94003 70%)' },
  ]

  const matchingGradient = gradients.find((g) => value >= g.min && value <= g.max)

  return matchingGradient ? matchingGradient.gradient : 'transparent'
}
</script>

<template>
  <div class="con">
    <div class="bg">
      <div class="rot">
        <div :style="rotateStyle"></div>
      </div>
      <div class="content">
        <p>{{ title }}</p>
        <p>{{ value }}</p>
        <span>{{ unit }}</span>
      </div>
    </div>
  </div>
</template>
