<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import schematic0 from '@/assets/json/lottie/schematic0.json'
import schematic1 from '@/assets/json/lottie/schematic1.json'
import schematic2 from '@/assets/json/lottie/schematic2.json'

const schematicAnimations = reactive({
  schematic0,
  schematic1,
  schematic2
})

const getRawAnimation = (animation) => toRaw(animation)
</script>

<template>
  <div class="schematic-con box-com">
    <div class="sub-title">
      <dl>
        <dt>전력 계통도</dt>
        <dd>전력 계통도를 한 눈에 확인할 수 있습니다.</dd>
      </dl>
    </div>
    <div class="box">
      <Vue3Lottie
        :animationData="getRawAnimation(schematicAnimations.schematic2)" />
    </div>
  </div>
</template>

<style lang="scss">
.schematic-con {
  .box {
    padding: 71px 107px;
  }
}
</style>
