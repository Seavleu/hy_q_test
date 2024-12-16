<script setup lang="ts">
import { formatTotal, returnToLocaleString } from '@/utils/format'
import { onMounted, computed } from 'vue'
import { useFetchData } from '@/composables/useFetchData'
import moment from 'moment'
import { GENERATION_API } from '@/lib/api';

const { data, isLoading, fetchData } = useFetchData(GENERATION_API.invalidCurrent, { plant_seq: 2 })

onMounted(() => {
  fetchData()
})
const invertReport = computed(() => data.value?.invert_report_list || {})
const inverterTotal = computed(() => data.value?.inverter_tot || {})
</script>

<template>
  <div class="invalid-con">
    <div class="sub-title">
      <dl>
        <dt>무효전력량 현황</dt>
        <dd>
          <span>{{ moment().format('YYYY년 M월 D일') }}(오늘)</span> 실시간
          무효전력량을 확인할 수 있습니다. 무효전력량은 송전되지 못하고 내부에서
          방전 또는 소모 되는 전력을 말합니다.
        </dd>
      </dl>
    </div>
    <div class="chart-con">
      <div class="display-box">
        <ul>
          <li>
            <p>
              금일 수차 발전량
              <strong>
                {{ returnToLocaleString(invertReport.today_gen_power) }}
                <span>kWh</span>
              </strong>
            </p>
          </li>
          <li>
            <p>
              금일 인버터 송전량
              <strong>
                {{ returnToLocaleString(invertReport.today_trans_power) }}
                <span>kWh</span>
              </strong>
            </p>
          </li>
          <li>
            <p>
              금일 무효전력량
              <strong>
                {{ returnToLocaleString(invertReport.today_invalid_power) }}
                <span>kWh</span>
              </strong>
            </p>
          </li>
          <li>
            <p>
              금일 무효율
              <strong class="color-y">
                {{ returnToLocaleString(invertReport.today_invalid_per) }}
                <span>%</span>
              </strong>
            </p>
          </li>
        </ul>
      </div>

      <div class="table-box">
        <div class="tit">현재 인버터 상세</div>
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
                <td class="right-line">{{ invertReport.device_name || '-' }}</td>
                <td class="cor0">{{ returnToLocaleString(invertReport.today_gen_power) }}</td>
                <td class="cor1">{{ returnToLocaleString(invertReport.today_trans_power) }}</td>
                <td>{{ returnToLocaleString(invertReport.today_invalid_power) }}</td>
                <td>{{ returnToLocaleString(invertReport.today_invalid_per) }}</td>
                <td>-</td>
              </tr>
              <tr>
                <td class="right-line">합계/평균</td>
                <td><strong>{{ formatTotal(inverterTotal.today_gen_power) }}</strong></td>
                <td><strong>{{ formatTotal(inverterTotal.today_trans_power) }}</strong></td>
                <td><strong>{{ formatTotal(inverterTotal.today_invalid_power) }}</strong></td>
                <td><strong>{{ formatTotal(inverterTotal.today_invalid_per) }}</strong></td>
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
