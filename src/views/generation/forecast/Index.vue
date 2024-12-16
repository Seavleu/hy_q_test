<script setup lang="ts">
import { formatTotal, returnToLocaleString } from '@/utils/format'
import { onMounted, computed } from 'vue'
import { useFetchData } from '@/composables/useFetchData'
import moment from 'moment'
import { GENERATION_API } from '@/lib/api';

const { data, isLoading, fetchData } = useFetchData(GENERATION_API.forecast, { plant_seq: 2 })

onMounted(() => {
  fetchData()
}) 
</script>

<template>
  <div class="box-com generation">
    <div class="sub-title">
      <dl>
        <dt>AI 발전량 예측</dt>
        <dd>
          <span>진도 소수력 발전소</span> 의 발전량을 AI가 Big Data 분석을 통해
          <span>{{ moment().format('YYYY년 MM월 DD일') }} (오늘) 기준</span> 내일부터 7일간 예측해 드립니다.
        </dd>
      </dl>
    </div>

    <div class="box">
      <div class="title">
        <img src="/src/assets/images/common/ico_exclamation02.png" alt="" />
        <p><strong>발전량 예측 모델</strong></p>
      </div>
      <div class="line"></div>
      <span class="sub">
        날씨예보 정보가 발생하면 AI는 과거 날씨정보와 해당 발전소의 발전정보를 분석하여 날씨예보와 가장 가까운 날씨, 발전정보를 추출하여<br />
        예보된 날짜에 기존 발존량, 발전시간을 반영해 발전량을 예측하고 SMP 가격은 오늘 가격을 적용하여 발전수익도 예측합니다.
      </span>
    </div>

    <div class="table-box">
      <div class="tbl">
        <table>
          <thead>
            <tr>
              <th rowspan="3" colspan="2"><strong>날짜</strong></th>
              <th rowspan="1" colspan="7"><strong>날씨예보</strong></th>
              <th rowspan="1" colspan="4"><strong>발전량예측</strong></th>
              <th rowspan="1" colspan="2"><strong>수익예측</strong></th>
            </tr>
            <tr>
              <th rowspan="2" class="right-none">날씨</th>
              <th rowspan="1" class="right-none">기온</th>
              <th rowspan="1" class="right-none">습도</th>
              <th rowspan="1" class="right-none">강수(설)확률</th>
              <th rowspan="1" class="right-none">강수(설)량</th>
              <th rowspan="2" class="right-none">풍향</th>
              <th rowspan="1">풍속</th>
              <th rowspan="1" class="right-none">수평 일사량</th>
              <th rowspan="1" class="right-none">수직 일사량</th>
              <th rowspan="1" class="right-none">발전시간</th>
              <th rowspan="1">발전량</th>
              <th rowspan="1" class="right-none">SMP</th>
              <th rowspan="1">판매수익</th>
            </tr>
            <tr>
              <th rowspan="1" class="right-none">°C</th>
              <th rowspan="1" class="right-none">%</th>
              <th rowspan="1" class="right-none">%</th>
              <th rowspan="1" class="right-none">mm</th>
              <th rowspan="1">m/s</th>
              <th rowspan="1" class="right-none">kWh/m²</th>
              <th rowspan="1" class="right-none">kWh/m²</th>
              <th rowspan="1" class="right-none">h</th>
              <th rowspan="1">kWh</th>
              <th rowspan="1" class="right-none">원</th>
              <th rowspan="1">만원</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2">2023.09.06</td>
              <td colspan="1" class="right-none">맑음</td>
              <td colspan="1" class="right-none">29</td>
              <td colspan="1" class="right-none">50</td>
              <td colspan="1" class="right-none">5</td>
              <td colspan="1" class="right-none">0</td>
              <td colspan="1" class="right-none">남서</td>
              <td colspan="1">2</td>
              <td colspan="1" class="right-none">3.4</td>
              <td colspan="1" class="right-none">5.3</td>
              <td colspan="1" class="right-none">12</td>
              <td colspan="1">300</td>
              <td colspan="1" class="right-none">103</td>
              <td colspan="1">120</td>
            </tr>
            <tr>
              <td colspan="2">2023.09.07</td>
              <td colspan="1" class="right-none">맑음</td>
              <td colspan="1" class="right-none">19</td>
              <td colspan="1" class="right-none">30</td>
              <td colspan="1" class="right-none">2</td>
              <td colspan="1" class="right-none">7</td>
              <td colspan="1" class="right-none">남동</td>
              <td colspan="1">2</td>
              <td colspan="1" class="right-none">3.9</td>
              <td colspan="1" class="right-none">5.1</td>
              <td colspan="1" class="right-none">123</td>
              <td colspan="1">300</td>
              <td colspan="1" class="right-none">121</td>
              <td colspan="1">120</td>
            </tr>
            <tr>
              <td colspan="2">2023.09.08</td>
              <td colspan="1" class="right-none">구름</td>
              <td colspan="1" class="right-none">29</td>
              <td colspan="1" class="right-none">50</td>
              <td colspan="1" class="right-none">5</td>
              <td colspan="1" class="right-none">0</td>
              <td colspan="1" class="right-none">남서</td>
              <td colspan="1">2</td>
              <td colspan="1" class="right-none">3.4</td>
              <td colspan="1" class="right-none">5.3</td>
              <td colspan="1" class="right-none">12</td>
              <td colspan="1">300</td>
              <td colspan="1" class="right-none">103</td>
              <td colspan="1">120</td>
            </tr>
            <tr>
              <td colspan="2">2023.09.09</td>
              <td colspan="1" class="right-none">흐림</td>
              <td colspan="1" class="right-none">29</td>
              <td colspan="1" class="right-none">50</td>
              <td colspan="1" class="right-none">5</td>
              <td colspan="1" class="right-none">0</td>
              <td colspan="1" class="right-none">남서</td>
              <td colspan="1">2</td>
              <td colspan="1" class="right-none">3.4</td>
              <td colspan="1" class="right-none">5.3</td>
              <td colspan="1" class="right-none">12</td>
              <td colspan="1">300</td>
              <td colspan="1" class="right-none">103</td>
              <td colspan="1">120</td>
            </tr>
            <tr>
              <td colspan="2">2023.09.10</td>
              <td colspan="1" class="right-none">맑음</td>
              <td colspan="1" class="right-none">29</td>
              <td colspan="1" class="right-none">50</td>
              <td colspan="1" class="right-none">5</td>
              <td colspan="1" class="right-none">0</td>
              <td colspan="1" class="right-none">남서</td>
              <td colspan="1">2</td>
              <td colspan="1" class="right-none">3.4</td>
              <td colspan="1" class="right-none">5.3</td>
              <td colspan="1" class="right-none">12</td>
              <td colspan="1">300</td>
              <td colspan="1" class="right-none">103</td>
              <td colspan="1">120</td>
            </tr>
            <tr>
              <td colspan="2">2023.09.11</td>
              <td colspan="1" class="right-none">비</td>
              <td colspan="1" class="right-none">29</td>
              <td colspan="1" class="right-none">50</td>
              <td colspan="1" class="right-none">5</td>
              <td colspan="1" class="right-none">0</td>
              <td colspan="1" class="right-none">남서</td>
              <td colspan="1">2</td>
              <td colspan="1" class="right-none">3.4</td>
              <td colspan="1" class="right-none">5.3</td>
              <td colspan="1" class="right-none">12</td>
              <td colspan="1">300</td>
              <td colspan="1" class="right-none">103</td>
              <td colspan="1">120</td>
            </tr>
            <tr>
              <td colspan="2">2023.09.12</td>
              <td colspan="1" class="right-none">구름</td>
              <td colspan="1" class="right-none">29</td>
              <td colspan="1" class="right-none">50</td>
              <td colspan="1" class="right-none">5</td>
              <td colspan="1" class="right-none">0</td>
              <td colspan="1" class="right-none">북서</td>
              <td colspan="1">2</td>
              <td colspan="1" class="right-none">3.4</td>
              <td colspan="1" class="right-none">5.3</td>
              <td colspan="1" class="right-none">12</td>
              <td colspan="1">300</td>
              <td colspan="1" class="right-none">103</td>
              <td colspan="1">120</td>
            </tr>
            <tr>
              <td colspan="2"><strong>합계/평균</strong></td>
              <td colspan="1" class="right-none"><strong>-</strong></td>
              <td colspan="1" class="right-none"><strong>29</strong></td>
              <td colspan="1" class="right-none"><strong>60</strong></td>
              <td colspan="1" class="right-none"><strong>27</strong></td>
              <td colspan="1" class="right-none"><strong>14</strong></td>
              <td colspan="1" class="right-none"><strong>-</strong></td>
              <td colspan="1"><strong>2</strong></td>
              <td colspan="1" class="right-none"><strong>3.4</strong></td>
              <td colspan="1" class="right-none"><strong>5.3</strong></td>
              <td colspan="1" class="right-none"><strong>68</strong></td>
              <td colspan="1"><strong>1523</strong></td>
              <td colspan="1" class="right-none"><strong>103</strong></td>
              <td colspan="1"><strong>625</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="@/assets/styles/generation.scss" />
