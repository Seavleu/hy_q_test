<script setup lang="ts"> 
import { onMounted, computed, ref } from 'vue'
import { useFetchData } from '@/composables/useFetchData'
import moment from 'moment'
import { TRANSMISSION_API } from '@/lib/api'

const toggle = ref<number>(0)

const { data, isLoading, fetchData } = useFetchData(TRANSMISSION_API.smpCurrent, { plant_seq: 2 })

onMounted(() => {
  fetchData()
})

const powerInfo = computed(() => data.value?.invert_report_list || {})
const smpInfo = computed(() => data.value?.inverter_tot || {})
</script>

<template>
  <div class="transmit-power-con">
    <div v-if="isLoading"></div>
    <div class="smp-con" v-else>
    <div class="sub-title">
      <dl>
        <dt>SMP판매 현황</dt>
        <dd>
          <span>{{ moment().format('YYYY년 MM월 DD일') }} (오늘) </span>실시간 SMP판매 현황을 확인할 수 있습니다.
        </dd>
      </dl>
    </div>

    <div class="current-con">
      <div class="doughnut-box">
        <ul>
          <li :style="{ '--doughnut-value': `${((powerInfo.today_power_gen * 100) / 662.4) * 1.8}deg` }">
            <dl>
              <dt>금일<br /><strong>수차 발전량</strong></dt>
              <dd>
                <strong>{{ powerInfo.today_power_gen }}</strong
                ><br />kWh
              </dd>
            </dl>
          </li>
          <li :style="{ '--doughnut-value': `${((powerInfo.today_power_transfer * 100) / 184) * 1.8}deg` }">
            <dl>
              <dt>금일<br /><strong>인버터 송전량</strong></dt>
              <dd>
                <strong>{{ powerInfo.today_power_transfer }}</strong
                ><br />kWh
              </dd>
            </dl>
          </li>
          <li :style="{ '--doughnut-value': `${((powerInfo.power_transfer_month * 100) / 500) * 1.8}deg` }">
            <dl>
              <dt>이번 달 누적<br /><strong>인버터 송전량</strong></dt>
              <dd>
                <strong>{{ powerInfo.power_transfer_month }}</strong
                ><br />kWh
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="smp-box">
        <ul>
          <li>
            <dl>
              <dt><span>진도 소수력 발전소</span><br /><strong>계약단가</strong><br /><span>(미장기계약자)</span></dt>
              <dd>
                <strong>{{ Number(powerInfo.contract_amt).toLocaleString('ko-KR') }}</strong
                >원/kWh
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>금일<br /><strong>평균 SMP</strong></dt>
              <dd>
                <strong>{{ powerInfo.today_smp_avg }}</strong
                >원
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>금일<br /><strong>예상 전력판매 수익</strong></dt>
              <dd>
                <strong>{{ Number(powerInfo.today_power_sell_monthly).toLocaleString('ko-KR') }}</strong
                >원
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="expect-box">
        <div class="tit">예상 전력판매 수익 계산</div>
        <div class="calculate-box">
          <div class="toggle-btn">
            <v-btn-toggle v-model="toggle">
              <v-btn style="color: #ffffff" variant="outlined">오늘</v-btn>
              <v-btn style="color: #ffffff" variant="outlined">이번달</v-btn>
            </v-btn-toggle>
          </div>
          <ul>
            <li>
              <dl>
                <dt class="val-box">
                  <p>
                    금일<br /><strong>인버터 송전량</strong><br /><span
                      ><strong class="cor0">{{ toggle ? 1 : powerInfo.today_power_transfer }}</strong
                      >kWh</span
                    >
                  </p>
                  <p>
                    금일<br /><strong>평균 SMP</strong><br /><span
                      ><strong class="cor1">{{ toggle ? 1 : powerInfo.today_smp_avg }}</strong
                      >원</span
                    >
                  </p>
                </dt>
                <dd>전력판매</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt class="val-box">
                  <p>
                    금일<br /><strong>인버터 송전량</strong><br /><span
                      ><strong class="cor0">{{ toggle ? 1 : powerInfo.today_power_transfer }}</strong
                      >kWh</span
                    >
                  </p>
                  <p>
                    <strong>0.098</strong>
                  </p>
                </dt>
                <dd>전력거래소 수수료</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt class="totel">
                  <strong>{{ Number(toggle ? 1 : powerInfo.today_power_sell_monthly).toLocaleString('ko-KR') }}</strong
                  >원
                </dt>
                <dd>수익</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
      <div class="table-box">
        <div class="tit">금일 진도 소수력 SMP 현황</div>
        <div class="tbl">
          <table>
            <colgroup>
              <col style="width: 130px" />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th rowspan="2"><strong>구분</strong></th>
                <th><strong>송전량</strong></th>
                <th colspan="2"><strong>금액</strong></th>
              </tr>
              <tr>
                <th>kWh</th>
                <th>육지</th>
                <th>제주</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>최고</td>
                <td>-</td>
                <td>{{ smpInfo.max_smp_land }}</td>
                <td>{{ smpInfo.max_smp_jeju }}</td>
              </tr>
              <tr>
                <td>최소</td>
                <td>-</td>
                <td>{{ smpInfo.min_smp_land }}</td>
                <td>{{ smpInfo.min_smp_jeju }}</td>
              </tr>
              <tr>
                <td>가중평균</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr v-for="item in smpInfo.hourly_smp">
                <td>{{ item.hour }}</td>
                <td :class="{ cor2: item.plant_send_kw }">{{ item.plant_send_kw || '-' }}</td>
                <td class="cor1">{{ item.smp_land }}</td>
                <td class="cor3">{{ item.smp_jeju }}</td>
              </tr>
              <tr class="totel">
                <td>합계/평균</td>
                <td>-</td>
                <td>{{ smpInfo.avg_smp_land }}</td>
                <td>{{ smpInfo.avg_smp_jeju }}</td>
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
