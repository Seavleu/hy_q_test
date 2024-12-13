<script setup lang="ts">
import moment from 'moment'
import { onMounted, watch } from 'vue'
import { useScreens } from 'vue-screen-utils'
import { useFetchStats } from '@/composables/useFetchStats'
import { formatTotal, returnToLocaleString } from '@/utils/format'

const { mapCurrent } = useScreens({
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px'
})

const columns = mapCurrent({ lg: 2 }, 2)
const expanded = mapCurrent({ lg: false }, true)

const { range, data, isLoading, fetchStats } = useFetchStats({
  start: new Date(),
  end: new Date()
})

watch(range, fetchStats, { deep: true })

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <div v-if="data && data.invert_report_list" class="invalid-con"> 
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
              <strong
                >{{
                  returnToLocaleString(data.invert_report_list.today_gen_power)
                }}
                <span>kWh</span></strong
              >
            </p>
          </li>
          <li>
            <p>
              금일 인버터 송전량
              <strong
                >{{
                  returnToLocaleString(
                    data.invert_report_list.today_trans_power
                  )
                }}
                <span>kWh</span></strong
              >
            </p>
          </li>
          <li>
            <p>
              금일 무효전력량
              <strong
                >{{
                  returnToLocaleString(
                    data.invert_report_list.today_invalid_power
                  )
                }}<span> kWh</span></strong
              >
            </p>
          </li>
          <li>
            <p>
              금일 무효율
              <strong class="color-y"
                >{{
                  returnToLocaleString(
                    data.invert_report_list.today_invalid_per
                  )
                }}<span>%</span></strong
              >
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
                <td class="right-line">
                  {{ data.invert_report_list.device_name || '-' }}
                </td>
                <td class="cor0">
                  {{
                    returnToLocaleString(
                      data.invert_report_list.today_gen_power
                    )
                  }}
                </td>
                <td class="cor1">
                  {{
                    returnToLocaleString(
                      data.invert_report_list.today_trans_power
                    )
                  }}
                </td>
                <td>
                  {{
                    returnToLocaleString(
                      data.invert_report_list.today_invalid_power
                    )
                  }}
                </td>
                <td>
                  {{
                    returnToLocaleString(
                      data.invert_report_list.today_invalid_per
                    )
                  }}
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td class="right-line">합계/평균</td>
                <td>
                  <strong>{{
                    formatTotal(data.inverter_tot.today_gen_power)
                  }}</strong>
                </td>
                <td>
                  <strong>{{
                    formatTotal(data.inverter_tot.today_trans_power)
                  }}</strong>
                </td>
                <td>
                  <strong>{{
                    formatTotal(data.inverter_tot.today_invalid_power)
                  }}</strong>
                </td>
                <td>
                  <strong>{{
                    formatTotal(data.inverter_tot.today_invalid_per)
                  }}</strong>
                </td>
                <td><strong>-</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <v-progress-circular indeterminate :size="50" />
  </div>
</template>

<style scoped lang="scss" src="@/assets/styles/generation.scss" />
