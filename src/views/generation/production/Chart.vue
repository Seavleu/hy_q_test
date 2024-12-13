<script setup lang="ts">
import moment from 'moment'
import { GENERATION_API } from '@/lib/api'
import { useScreens } from 'vue-screen-utils'
import { ref, reactive, watch, onMounted, computed } from 'vue'
import chartJson from '@/assets/json/charts/production/powerProductionChart1.json'
import { initChart, setChartData, toggleChartType, zoomChart } from '@/utils/charts'
import type { ProductionChartData, ProductionChartParams } from '@/types/api'
import { handleApiResponse } from '@/utils/apiUtils'
import { formatTotal, returnToLocaleString } from '@/utils/format'

const { mapCurrent } = useScreens({
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
})

const columns = mapCurrent({ lg: 2 }, 2)
const expanded = mapCurrent({ lg: false }, true)
const chart = ref({ ...chartJson })
const range = ref({ start: new Date(), end: new Date() })
const toggleNone = ref(1)
const invert = ref(0)
const isLoading = ref(false)

const chartData = reactive<ProductionChartData>({
  power_data: { tot_power_trans: 0, tot_power_gen: 0, trans_per: 0 },
  graph_data_list: [],
  invert_report_list: [],
})

const invertList = computed(() => [
  { title: '전체', value: 0 },
  ...(chartData.invert_report_list?.map((v, idx) => ({
    title: v.device_name,
    value: idx + 1,
  })) ?? []),
])

const getStats = async () => {
  try {
    isLoading.value = true
    const params: ProductionChartParams = {
      plant_seq: 2,
      start_date: moment(range.value.start).format('YYYYMMDD'),
      end_date: moment(range.value.end).format('YYYYMMDD'),
      ...(invert.value !== 0 && { device_id: invert.value }),
    }

    const response = await GENERATION_API.productionChart(params)
    handleApiResponse(response, (data: any) => {
      chartData.power_data = data.power_data
      chartData.graph_data_list = data.graph_data_list
      chartData.invert_report_list = data?.invert_report_list ?? []

      initChart(chart)
      setChartData(chart, chartData.graph_data_list, 'time_hour', ['kw', 'scaled_kw'])
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
  } finally {
    isLoading.value = false
  }
}

watch(range, getStats, { deep: true })
watch(invert, getStats)

onMounted(() => {
  getStats()
  toggleChartType(chart, 'line')
})

const zoomIn = () => zoomChart(chart, 0.8)
const zoomOut = () => zoomChart(chart, 1.2)
</script>


<template>
  <div class="production-con">
    <div class="sub-title">
      <dl>
        <dt>생산전력량 통계차트</dt>
        <dd>
          <span>{{ moment().subtract(1, 'days').format('YYYY년 M월 D일') + '(어제)' }}</span>
          까지의 생산전력량 통계를 확인할 수 있습니다.
        </dd>
      </dl>
    </div>
    <div class="chart-con">
      <div class="display-box">
        <ul>
          <li>
            <p>
              총 수차 발전량 <strong>{{returnToLocaleString(chartData.power_data?.tot_power_gen) }}
                <span>MWh</span></strong>
            </p>
          </li>
          <li>
            <p>
              총 인버터 발전량 <strong>{{returnToLocaleString(chartData.power_data?.tot_power_trans) }}
                <span>MWh</span></strong>
            </p>
          </li>
          <li>
            <p>
              AC/AC 변환효율 <strong>{{returnToLocaleString(chartData.power_data?.trans_per) }}
                <span>%</span></strong>
            </p>
          </li>
          <li>
            <p>
              생산효율
              <strong class="color-y">{{formatTotal((chartData.power_data?.tot_power_trans /
                chartData.power_data?.tot_power_gen) * 100) }} <span>%</span></strong>
            </p>
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
            <v-btn-toggle v-model="toggleNone">
              <v-btn style="color: #ffffff" variant="outlined" :value="1">어제</v-btn>
              <v-btn style="color: #ffffff" variant="outlined" :value="2">7일</v-btn>
              <v-btn style="color: #ffffff" variant="outlined" :value="3">한달</v-btn>
              <v-btn style="color: #ffffff" variant="outlined" :value="4">직접</v-btn>
            </v-btn-toggle>
          </dd>
          <dt>날짜</dt>
          <dd>
            <DatePicker v-model="range" :columns="columns" is-range :disabled="toggleNone !== 4 || isLoading">
              <template #default="{ togglePopover, inputValue, inputEvents }">
                <div class="picker-date">
                  <input :value="inputValue.start" disabled />
                  ~
                  <input :value="inputValue.end" disabled />
                  <a @click="toggleNone === 4 && !isLoading && togglePopover()">켈린더</a>
                </div>
              </template>
            </DatePicker>
          </dd>
        </dl>
        <div v-if="isLoading">
        </div>
      </div> 
     

      <div class="chart-box">
        <div class="chart-btn">
          <a :class="['line', { active: chartType === 'line' }]" @click="toggleChartType('line')">LINE</a>
          <a :class="['bar', { active: chartType === 'bar' }]" @click="toggleChartType('bar')">BAR</a>
          <a class="zoom-in" @click="zoomIn">확대</a>
          <a class="zoom-out" @click="zoomOut">축소</a>
        </div>
        <highcharts type="chart" :options="chart"></highcharts>
        <span>{{ moment(range.end).format('YYYY-MM-DD') }}</span>
      </div>

      <div class="table-box">
        <div class="tit">
          <span>{{ moment(range.start).format('YYYY.MM.DD') }} ~ {{ moment(range.end).format('YYYY.MM.DD') }}</span>
          실시간 인버터 상세
        </div>
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
              <tr>
                <th>V</th>
                <th>A</th>
                <th class="right-line">kW</th>
                <th>V</th>
                <th>A</th>
                <th class="right-line">kW</th>
                <th>kWh</th>
                <th>Hour</th>
                <th>%</th>
                <th>Hz</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="V in chartData.invert_report_list" :key="V.device_id">
                <td class="right-line">{{ V.device_name || '-' }}</td>
                <td class="cor0">{{returnToLocaleString(V.ac_v) }}</td>
                <td class="cor0">{{returnToLocaleString(V.ac_a) }}</td>
                <td class="cor0 right-line">{{returnToLocaleString(V.ac_kw) }}</td>
                <td class="cor1">{{returnToLocaleString(V.ac_v) }}</td>
                <td class="cor1">{{returnToLocaleString(V.ac_a) }}</td>
                <td class="cor1 right-line">{{returnToLocaleString(V.ac_kw) }}</td>
                <td>{{returnToLocaleString(V.kwh_t) }}</td>
                <td>{{returnToLocaleString(V.p_h) }}</td>
                <td>{{returnToLocaleString(V.trans_per) }}</td>
                <td>{{returnToLocaleString(V.hz) }}</td>
                <td>{{returnToLocaleString(V.pf) }}</td>
              </tr>
              
              <tr v-for="V in chartData.invert_report_list" :key="V.device_id">
                <td class="right-line"><strong>합계/평균</strong></td>
                <td>
                  <strong>{{formatTotal(V.ac_v) }}</strong>
                </td>
                <td>
                  <strong>{{formatTotal(V.ac_a) }}</strong>
                </td>
                <td class="right-line">
                  <strong>{{formatTotal(V.ac_kw) }}</strong>
                </td>
                <td>
                  <strong>{{formatTotal(V.ac_v) }}</strong>
                </td>
                <td>
                  <strong>{{formatTotal(V.ac_a) }}</strong>
                </td>
                <td class="right-line">
                  <strong>{{formatTotal(V.ac_kw) }}</strong>
                </td>
                <td>
                  <strong>{{formatTotal(V.kwh_t) }}</strong>
                </td>
                <td>
                  <strong>{{formatTotal(V.p_h) }}</strong>
                </td>
                <td>
                  <strong>{{formatTotal(V.trans_per) }}</strong>
                </td>
                <td>
                  <strong>{{formatTotal(V.hz) }}</strong>
                </td>
                <td>
                  <strong>{{formatTotal(V.pf) }}</strong>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="@/assets/styles/generation.scss" />
