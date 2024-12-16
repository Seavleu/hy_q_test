<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import chartJson from '@/assets/json/charts/production/powerProductionChart1.json'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'
import moment from 'moment'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { handleApiResponse } from '@/utils/apiUtils'
import { initChart, setChartData } from '@/utils/charts'
import { formatTime, formatTotal, returnToLocaleString } from '@/utils/format' 
const currentData = ref({
  weather_data: {
    base_date: '20240510',
    base_time: '1200',
    area_name: '서울특별시',
    t1h: 23.5,
    sky_desc: '맑음',
    wsd: 3.2,
    reh: 45,
    pm25_desc: '좋음',
    pm25value: 15,
  },
  power_data: {
    plant_gen_power: 5000,
    today_tot_power_transfer: 3000,
    gen_per: 75,
    today_tot_power_gen: 1500,
  },
  inverter_data_list: [
    { device_id: 1, device_name: '인버터 1', ac_kw: 12.3, ac_v: 230, ac_a: 54.3, ac_tot_kw: 123.4, hz: 60, pf: 99.5 },
  ],
  inverter_total_data: {
    device_name: '합계/평균',
    ac_kw: 22.1,
    ac_v: 235,
    ac_a: 49.7,
    ac_tot_kw: 233.7,
    hz: 60,
    pf: 99.1,
    today_tot_trans_per: 85.2,
  }, 
})
 
const swiperRefs: { doughnut: Ref<Swiper | null>; inverter: Ref<Swiper | null> } = {
  doughnut: ref(null),
  inverter: ref(null),
}
 
const slide = (type: 'doughnut' | 'inverter', dir: 'prev' | 'next') => {
  const swiperInstance = swiperRefs[type]?.value
  if (swiperInstance) {
    dir === 'next' ? swiperInstance.slideNext() : swiperInstance.slidePrev()
  }
}

const chartOptions = ref({ ...chartJson }) // Load chart mock configuration

// Temporary Chart Update with Mock Data
const loadChart = () => {
  chartOptions.value.series[0].data = [
    { name: '10:00', y: 100 },
    { name: '11:00', y: 200 },
    { name: '12:00', y: 300 },
  ]
  chartOptions.value.series[1].data = [
    { name: '10:00', y: 90 },
    { name: '11:00', y: 180 },
    { name: '12:00', y: 250 },
  ]
}

</script>

<template>
  <div class="production-con">
    <div class="sub-title">
      <dl>
        <dt>생산전력량 현황</dt>
        <dd>
          <span>2024년 05월 10일 (오늘) 12:00</span>
          현재 생산 전력량을 확인할 수 있습니다.
        </dd>
      </dl>
    </div>

    <div class="current-con">
      <div class="display-box">
        <ul class="test">
          <li>
            <p>하루 기대 발전량 <strong>0<span>kWh</span></strong></p>
          </li>
          <li>
            <p>금일 누적 발전량 <strong>0<span>kWh</span></strong></p>
          </li>
          <li>
            <p>생산효율 <strong class="color-y">0<span>%</span></strong></p>
          </li>
        </ul>
      </div>

      <div class="display-sub-box">
        <div class="left sub-box">
          <ul>
            <li>
              <dl>
                <dt>금일 총 수차 발전량</dt>
                <dd><strong>0</strong> kWh</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>금일 총 인버터 발전량</dt>
                <dd><strong>0</strong> kWh</dd>
              </dl>
            </li>
          </ul>
        </div>
        <div class="right sub-box">
          <ul>
            <li>
              <p class="type0">0<span>℃</span></p>
              <dl>
                <dt>지역 정보 없음</dt>
                <dd>12:00시 현재, 하늘 상태 정보 없음</dd>
              </dl>
            </li>
            <li>
              <ol>
                <li><span>현재 풍속</span><strong>0 m/s</strong></li>
                <li><span>현재 습도</span><strong>0 %</strong></li>
                <li><span>미세먼지</span><strong>정보 없음 (0㎍/㎥)</strong></li>
              </ol>
            </li>
          </ul>
        </div>
      </div>

      <div class="current-sub-box">
    <!-- Doughnut Box -->
    <div class="doughnut-box">
      <div class="tit">
        <p>실시간 인버터 출력 현황</p>
        <div class="nav">
          <p class="prev btn-disabled" @click="slide('doughnut', 'prev')"></p>
          <span></span>
          <p class="next" @click="slide('doughnut', 'next')"></p>
        </div>
      </div>
      <Swiper
        :slides-per-view="3"
        :space-between="20"
        :free-mode="true"
        :navigation="{ prevEl: '.prev', nextEl: '.next' }"
        @swiper="(swiper) => (swiperRefs.doughnut.value = swiper)"
      >
        <SwiperSlide v-for="V in currentData.inverter_data_list" :key="V.device_id">
          <li class="doughnut-item" :style="{ '--doughnut-value': `${V.ac_kw * 1.8}deg` }">
            <dl>
              <dt>{{ V.ac_kw }}<span>kW</span></dt>
              <dd>{{ V.device_name }} (50kW)</dd>
            </dl>
          </li>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Inverter Box -->
    <div class="inverter-box">
      <div class="tit">
        <p>실시간 인버터 AC/AC 입·출력 비교</p>
        <div class="nav">
          <p class="prev btn-disabled" @click="slide('inverter', 'prev')"></p>
          <span></span>
          <p class="next" @click="slide('inverter', 'next')"></p>
        </div>
      </div>
      <Swiper
        :slides-per-view="3"
        :space-between="20"
        :free-mode="true"
        :navigation="{ prevEl: '.prev', nextEl: '.next' }"
        @swiper="(swiper) => (swiperRefs.inverter.value = swiper)"
      >
        <SwiperSlide>
          <p>{{ currentData.inverter_total_data.device_name || '인버터' }}</p>
          <ol>
            <li>
              <span>AC 입력</span>
              <span><strong>{{ currentData.inverter_total_data.ac_kw }}</strong> kW</span>
            </li>
            <li>
              <span>AC 출력</span>
              <span><strong>{{ currentData.inverter_total_data.ac_kw }}</strong> kW</span>
            </li>
          </ol>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>

    <div class="chart-box">
        <div class="tit">생산 전력량과 효율 그래프</div>
        <highcharts :options="chartOptions"></highcharts>
      </div>

      <div class="table-box">
        <div class="tit">실시간 인버터 상세</div>
        <div class="tbl">
          <table>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th rowspan="3" class="right-line"><strong>구분</strong></th>
                <th colspan="3" class="right-line"><strong>AC 입력</strong></th>
                <th colspan="3" class="right-line"><strong>AC 출력</strong></th>
                <th colspan="5"><strong>발전정보</strong></th>
              </tr>
              <tr>
                <th>전압</th>
                <th>전류</th>
                <th class="right-line">전력</th>
                <th>전압</th>
                <th>전류</th>
                <th class="right-line">전력</th>
                <th>누적 발전량</th>
                <th>발전시간</th>
                <th>변환효율</th>
                <th>주파수</th>
                <th>역률</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="right-line">인버터</td>
                <td class="cor0">0</td>
                <td class="cor0">0</td>
                <td class="cor0 right-line">0</td>
                <td class="cor1">0</td>
                <td class="cor1">0</td>
                <td class="cor1 right-line">0</td>
                <td>0</td>
                <td>-</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td class="right-line"><strong>합계/평균</strong></td>
                <td><strong>0</strong></td>
                <td><strong>0</strong></td>
                <td class="right-line"><strong>0</strong></td>
                <td><strong>0</strong></td>
                <td><strong>0</strong></td>
                <td class="right-line"><strong>0</strong></td>
                <td><strong>0</strong></td>
                <td>-</td>
                <td><strong>0</strong></td>
                <td><strong>0</strong></td>
                <td><strong>0</strong></td>
              </tr>
              <tr>
                <td colspan="12" class="text-center">데이터가 없습니다</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="@/assets/styles/generation.scss" />
