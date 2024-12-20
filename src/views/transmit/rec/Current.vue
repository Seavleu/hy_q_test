<script setup lang="ts"> 
import { onMounted, computed, ref } from 'vue'
import { useFetchData } from '@/composables/useFetchData' 
import { TRANSMISSION_API } from '@/lib/api'

const toggle = ref<number>(0)

const { data, isLoading, fetchData } = useFetchData(TRANSMISSION_API.recCurrent, { plant_seq: 2 })

onMounted(() => {
  fetchData()
})

const powerInfo = computed(() => data.value?.invert_report_list || {})
const smpInfo = computed(() => data.value?.inverter_tot || {})
</script>

<template>
  <div class="transmit-power-con">
    <div v-if="isLoading"></div>
    <div class="rec-con" v-else>
    <div class="sub-title">
      <dl>
        <dt>REC판매 현황</dt>
        <dd><span>2023년 9월 5일(오늘)</span> 실시간 REC판매 현황을 확인할 수 있습니다.</dd>
      </dl>
    </div>

    <div class="current-con">
      <div class="rec-box">
        <div class="tit">
          <dl>
            <dt>진도 소수력 발전소 <strong>오늘 보유 REC</strong></dt>
            <dd>
              <p><strong>2</strong></p>
              <p>
                REC<br /><span>(이월 0.57)</span>
              </p>
            </dd>
          </dl>
        </div>
        <div class="data">
          <ul>
            <li>
              <dl>
                <dt>오늘 판매 REC : <span>1</span>REC</dt>
                <dd>판매 수익 : <strong>90,000</strong>원</dd>
              </dl>
              <dl>
                <dt>현재 잔고 : <span>1</span>REC</dt>
                <dd>현재 평가자산 : <strong>90,000</strong>원</dd>
              </dl>
            </li>
            <li>
              <p>이번 달 판매 REC : <span>3</span>REC</p>
              <p>이번 달 판매 수익 : <strong>1,000,000.00</strong>원</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="data-chart-box">
        <div class="tit">
          <strong>9월 5일 화요일</strong> REC 거래소 현황 차트
        </div>
        <div class="data">
          <ul>
            <li>
              <dl>
                <dt>이전 거래소 종가</dt>
                <dd><strong>69,350</strong>원</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>최근 거래소 종가</dt>
                <dd><strong>69,350</strong>원</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>거래일간 변동성</dt>
                <dd class="down"><strong>69,350</strong>원</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
      <div class="table-box">
        <div class="tbl">
          <table>
            <colgroup>
              <col style="width:130px;" />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th rowspan="2"><strong>구분</strong></th>
                <th colspan="2"><strong>금액</strong></th>
              </tr>
              <tr>
                <th>육지</th>
                <th>제주</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>최고</td>
                <td class="cor1">164.58</td>
                <td>164.58</td>
              </tr>
              <tr>
                <td>최소</td>
                <td class="cor1">164.58</td>
                <td class="cor3">164.58</td>
              </tr>
              <tr>
                <td>상한가</td>
                <td class="cor1">164.58</td>
                <td class="cor3">164.58</td>
              </tr>
              <tr>
                <td>하한가</td>
                <td class="cor1">164.58</td>
                <td class="cor3">164.58</td>
              </tr>
              <tr>
                <td>현재가</td>
                <td class="cor1">164.58</td>
                <td class="cor3">164.58</td>
              </tr>
              <tr>
                <td>변동</td>
                <td class="cor1">164.58</td>
                <td class="cor3">164.58</td>
              </tr>
              <tr>
                <td>종가</td>
                <td class="up">164.58</td>
                <td class="down">164.58</td>
              </tr>
              <tr>
                <td>평균가</td>
                <td class="cor1">164.58</td>
                <td class="cor3">164.58</td>
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
