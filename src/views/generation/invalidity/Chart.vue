<script setup lang="ts">
import { useFetchStats } from '@/composables/useFetchStats';
import { GENERATION_API } from '@/lib/api'
import { formatTotal, returnToLocaleString } from '@/utils/format';
import moment from 'moment';

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
  zoomOut,
} = useFetchStats(GENERATION_API.invalidChart)

fetchChartStats()
</script>

<template>
  <div class="invalid-con">
    <div class="sub-title">
      <dl>
        <dt>무효전력량 통계차트</dt>
        <dd>
          <span>{{ moment().subtract(1, 'days').format('YYYY년 M월 D일') }}(어제)</span> 까지의 무효전력량 통계를 확인할 수 있습니다.
        </dd>
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

      <div class="chart-box">
        <div class="chart-btn">
          <a :class="['line', { active: chartType === 'line' }]" @click="toggleChartTypeHandler('line')">LINE</a>
          <a :class="['bar', { active: chartType === 'bar' }]" @click="toggleChartTypeHandler('bar')">BAR</a>
          <a class="zoom-in" @click="zoomIn">확대</a>
          <a class="zoom-out" @click="zoomOut">축소</a>
        </div>
        <span>{{ moment(range.end).format('YYYY-MM-DD') }}</span>
        <highcharts type="chart" :options="chart"></highcharts>
      </div>

      <div class="table-box">
        <div class="tit">
          <span>
            {{ moment(range.start).format('YYYY.MM.DD') }} ~ {{ moment(range.end).format('YYYY.MM.DD') }}
          </span>
          현재 인버터 상세
        </div>
        <div class="tbl">
          <table>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th rowspan="2"><strong>구분</strong></th>
                <th><strong>소수력 발전량</strong></th>
                <th><strong>인버터 송전량</strong></th>
                <th><strong>무효전력량</strong></th>
                <th><strong>무효율</strong></th>
                <th><strong>발전시간</strong></th>
              </tr>
              <tr>
                <th>kWh</th>
                <th>kWh</th>
                <th>kWh</th>
                <th>%</th>
                <th>Hour</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="right-line">{{ data?.invert_report_list?.device_name || '-' }}</td>
                <td class="cor0">{{ returnToLocaleString(data?.invert_report_list.gen_power) }}</td>
                <td class="cor1">{{ returnToLocaleString(data?.invert_report_list.trans_power) }}</td>
                <td>{{ returnToLocaleString(data?.invert_report_list.invalid_power) }}</td>
                <td>{{ returnToLocaleString(data?.invert_report_list.invalid_per) }}</td>
                <td><strong>-</strong></td>
              </tr>
              <tr>
                <td class="right-line"><strong>합계/평균</strong></td>
                <td>
                  <strong>{{ formatTotal(data?.invert_report_list.gen_power) }}</strong>
                </td>
                <td>
                  <strong>{{ formatTotal(data?.invert_report_list.trans_power) }}</strong>
                </td>
                <td>
                  <strong>{{ formatTotal(data?.invert_report_list.invalid_power) }}</strong>
                </td>
                <td>
                  <strong>{{ formatTotal(data?.invert_report_list.invalid_per) }}</strong>
                </td>
                <td><strong>-</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss" src="@/assets/styles/generation.scss" />
