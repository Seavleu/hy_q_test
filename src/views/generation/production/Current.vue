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

const chartOptions = ref({ ...chartJson })

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
        <ul>
          <li>
            <p>
              하루 기대 발전량
              <strong>{{ returnToLocaleString(currentData.power_data.plant_gen_power) }}<span>kWh</span></strong>
            </p>
          </li>
          <li>
            <p>
              금일 누적 발전량
              <strong>{{ returnToLocaleString(currentData.power_data.today_tot_power_transfer)
                }}<span>kWh</span></strong>
            </p>
          </li>
          <li>
            <p>
              생산효율
              <strong class="color-y">{{ returnToLocaleString(currentData.power_data.gen_per) }}<span>%</span></strong>
            </p>
          </li>
        </ul>
      </div>

      <div class="display-sub-box">
        <div class="left sub-box">
          <ul>
            <li>
              <dl>
                <dt>금일 총 수차 발전량</dt>
                <dd>
                  <strong>{{ returnToLocaleString(currentData.power_data.today_tot_power_transfer) }}</strong> kWh
                </dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>금일 총 인버터 발전량</dt>
                <dd>
                  <strong>{{ returnToLocaleString(currentData.power_data.today_tot_power_gen) }}</strong> kWh
                </dd>
              </dl>
            </li>
          </ul>
        </div>
        <div class="right sub-box">
          <ul>
            <li>
              <p class="type0">{{ returnToLocaleString(currentData.weather_data.t1h) }}<span>℃</span></p>
              <dl>
                <dt>{{ currentData.weather_data.area_name }}</dt>
                <dd>
                  {{ formatTime(currentData.weather_data.base_time) }}시 현재, {{ currentData.weather_data.sky_desc }}
                </dd>
              </dl>
            </li>
            <li>
              <ol>
                <li>
                  <span>현재 풍속</span>
                  <strong>{{ returnToLocaleString(currentData.weather_data.wsd) }} m/s</strong>
                </li>
                <li>
                  <span>현재 습도</span>
                  <strong>{{ returnToLocaleString(currentData.weather_data.reh) }} %</strong>
                </li>
                <li>
                  <span>미세먼지</span>
                  <strong>
                    {{ currentData.weather_data.pm25_desc }} ({{ formatTotal(currentData.weather_data.pm25value) }}㎍/㎥)
                  </strong>
                </li>
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
          <Swiper :slides-per-view="3" :space-between="20" :free-mode="true"
            :navigation="{ prevEl: '.prev', nextEl: '.next' }"
            @swiper="(swiper) => (swiperRefs.doughnut.value = swiper)">
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
          <Swiper :slides-per-view="3" :space-between="20" :free-mode="true"
            :navigation="{ prevEl: '.prev', nextEl: '.next' }"
            @swiper="(swiper) => (swiperRefs.inverter.value = swiper)">
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
            <thead>
              <tr>
                <th>구분</th>
                <th>AC 입력 전압</th>
                <th>AC 입력 전류</th>
                <th>AC 입력 전력</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="V in currentData.inverter_data_list" :key="V.device_id">
                <td>{{ V.device_name }}</td>
                <td>{{ returnToLocaleString(V.ac_v) }} V</td>
                <td>{{ returnToLocaleString(V.ac_a) }} A</td>
                <td>{{ returnToLocaleString(V.ac_kw) }} kW</td>
              </tr>
              <tr>
                <td>합계/평균</td>
                <td>{{ returnToLocaleString(currentData.inverter_total_data.ac_v) }} V</td>
                <td>{{ returnToLocaleString(currentData.inverter_total_data.ac_a) }} A</td>
                <td>{{ returnToLocaleString(currentData.inverter_total_data.ac_kw) }} kW</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="@/assets/styles/generation.scss" />
