<script setup lang="ts">
import moment from 'moment' 
import { ref } from 'vue'
import chartJson from '@/assets/json/charts/production/weatherChart0.json'
import columnJson from '@/assets/json/charts/production/weatherChart1.json'
import chartJson0 from '@/assets/json/charts/production/weatherChart2.json'
import { useFetchStats } from '@/composables/useFetchStats'
import { GENERATION_API } from '@/lib/api'   
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
} = useFetchStats(GENERATION_API.weatherChart, chartJson, 'time_hour', ['kw', 'scaled_kw'])

fetchChartStats()
</script>

<template>
  <div class="weather-con">
    <div class="sub-title">
      <dl>
        <dt>기상관측 통계차트</dt>
        <dd>[진도군 군내면]의 <span>2023년 9월 4일(어제)</span> 까지의 기상관측 통계를 확인할 수 있습니다.</dd>
      </dl>
    </div>

    <div class="chart-con">
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

      <div class="chart-tbl-con">
        <div class="tab">
          <div class="chart-box">
            <div class="chart-btn">
              <span class="clock">최근발표시각</span>
              <span class="exclamation" @click="modalIsOpen = true"><span>날짜기호 설명</span></span>
              <a class="line" :class="{ active: chartType === 'line' }" @click="chartType = 'line'">LINE</a>
              <a class="bar" :class="{ active: chartType === 'bar' }" @click="chartType = 'bar'">BAR</a>
              <a class="day" :class="{ active: chartType === 'day' }" @click="chartType = 'day'">DAY</a>
            </div>
          </div>
        </div>

        <div>
          <template v-if="chartType === 'line'">
            <div class="table-box chart-tbl">
              <div class="tbl">
                <table>
                  <tbody>
                    <tr>
                      <th>시각</th>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                      <td>11시</td>
                    </tr>
                    <tr>
                      <th>날씨</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>기온</th>
                      <td colspan="20" class="chart">
                        <div style="margin-top: -8px; margin-bottom: -14px">
                          <highcharts type="chart" :options="chart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>체감온도</th>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                      <td>30℃</td>
                    </tr>
                    <tr class="circle">
                      <th>강수량<br />(mm)</th>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                      <td><span>-</span></td>
                    </tr>
                    <tr>
                      <th>강수확률</th>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                    </tr>
                    <tr>
                      <th>바람<br />(m/s)</th>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                      <td><img src="/src/assets/images/common/ico_arrow.png" alt="" /><br />2</td>
                    </tr>
                    <tr>
                      <th>습도</th>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                      <td>80%</td>
                    </tr>
                    <tr>
                      <th>폭염영향</th>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="total-box">
        <ul>
          <li><strong>9월 6일 (수)</strong></li>
          <li>
            <dl>
              <dt>하루 평균 총 발전량</dt>
              <dd><strong>662.40</strong> kW</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>예상 발전량</dt>
              <dd><strong>331.20</strong> kW</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>날씨정보</dt>
              <dd><strong class="big">구름많음</strong> (낮)</dd>
            </dl>
          </li>
        </ul>
      </div>

      <v-dialog v-model="modalIsOpen" width="auto">
        <!-- <WeatherModal :closeWeatherModal="closeWeatherModal" /> -->
      </v-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss" src="@/assets/styles/generation.scss" />
