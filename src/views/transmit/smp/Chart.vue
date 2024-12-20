<script setup lang="ts">
import moment from 'moment' 
import { useFetchStats } from '@/composables/useFetchStats'
import { GENERATION_API } from '@/lib/api'  
import chartJson from '@/assets/json/charts/transmit/smpChart.json'
import { TRANSMISSION_API } from '@/lib/api'

import { useScreens } from 'vue-screen-utils'
import { formatTotal, returnToLocaleString } from '@/utils/format'
const { mapCurrent } = useScreens({
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
})
const columns = mapCurrent({ lg: 2 }, 2)

const { 
  range, 
  toggleNone, 
  chartType, 
  invert, 
  chart, 
  data, 
  isLoading, 
  invertList, 
  fetchChartStats, 
  toggleChartTypeHandler, 
  zoomIn, 
  zoomOut 
} = useFetchStats(TRANSMISSION_API.smpChart, chartJson)

fetchChartStats()
</script>

<template>
  <div class="transmit-power-con">
    <div v-if="isLoading"></div>
     <div class="smp-con" v-else>
    <div class="sub-title">
      <dl>
        <dt>SMP판매 통계차트</dt>
        <dd><span>2023년 9월 5일(어제) </span>까지의 SMP판매 통계를 확인할 수 있습니다.</dd>
      </dl>
    </div>

    <div class="chart-con">
      <div class="smp-box">
        <ul>
          <li>
            <dl>
              <dt>총 송전량</dt>
              <dd><strong>876,123.50</strong> MWh</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>총 예상 전력판매 수익</dt>
              <dd><strong>876,123.50</strong> MWh</dd>
            </dl>
          </li>
        </ul>
      </div>

      <div class="search-box">
        <dl>
          <dt>장비</dt>
          <dd>
            <v-combobox :items="invertList" v-model="invert" item-title="title" item-value="value" variant="outlined"
              placeholder="선택" style="min-width: 120px" :disabled="toggleNone === 0 || isLoading"></v-combobox>
          </dd>
          <dd class="toggle-btn">
            <v-btn-toggle v-model="toggleNone" class="v-btn-group">
              <v-btn variant="outlined" :value="1" :class="{ 'v-btn--active': toggleNone === 1 }">어제</v-btn>
              <v-btn variant="outlined" :value="2" :class="{ 'v-btn--active': toggleNone === 2 }">7일</v-btn>
              <v-btn variant="outlined" :value="3" :class="{ 'v-btn--active': toggleNone === 3 }">한달</v-btn>
              <v-btn variant="outlined" :value="4" :class="{ 'v-btn--active': toggleNone === 4 }">직접</v-btn>
            </v-btn-toggle>
          </dd>
          <dt>날짜</dt>
          <dd>
            <DatePicker v-model="range" :columns="2" is-range :disabled="toggleNone !== 4 || isLoading">
              <template #default="slotProps">
                <div class="picker-date">
                  <input :value="range.start" disabled />
                  ~
                  <input :value="range.end" disabled />
                  <a @click="toggleNone === 4 && !isLoading && togglePopover()">켈린더</a>
                </div>
              </template>
            </DatePicker>
          </dd>
        </dl>
        <div v-if="isLoading"></div>
      </div>

      <div class="chart-box">
        <div class="chart-btn">
          <a class="line">LINE</a>
          <a class="bar active">BAR</a>
          <a class="zoom-in">확대</a>
          <a class="zoom-out">축소</a>
        </div>
        <highcharts type="chart" :options="chart"></highcharts>
      </div>

      <div class="table-box">
        <div class="tit"><strong>9월 5일 화요일</strong> 진도 소수력 SMP 현황</div>

        <div class="tbl">
          <table>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th rowspan="2"><strong>날짜</strong></th>
                <th><strong>송전량</strong></th>
                <th><strong>평균 SMP</strong></th>
                <th><strong>평균 REC</strong></th>
                <th><strong>예상 전력판매 수익</strong></th>
              </tr>
              <tr>
                <th>kWh</th>
                <th>원/kWh</th>
                <th>원/kWh</th>
                <th>원</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023년 9월</td>
                <td class="cor2">85.12</td>
                <td class="cor3">85.12</td>
                <td>85.12</td>
                <td>85.12</td>
              </tr>
              <tr>
                <td>9월 4일(월)</td>
                <td>85.12</td>
                <td>85.12</td>
                <td>85.12</td>
                <td>85.12</td>
              </tr>
              <tr class="totel">
                <td>합계/평균</td>
                <td>85.12</td>
                <td>85.12</td>
                <td>85.12</td>
                <td>85.12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped lang="scss" src="@/assets/styles/transmit.scss" />
