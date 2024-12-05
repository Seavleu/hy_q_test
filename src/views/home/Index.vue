<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import salesChartJson from '@/assets/json/charts/main/salesChart'
import IncomeChartJson from '@/assets/json/charts/main/IncomeChart'
import powerTransmissionChartJson from '@/assets/json/charts/main/powerTransmissionChart'
import improvementChartJson from '@/assets/json/charts/main/improvementChart'
import { Swiper, SwiperSlide } from 'swiper/vue'
import ProtractorChart from '@/components/shared/ProtractorChart.vue'
import { returnToLocaleString, formatTime } from '@/utils/format'
import moment from 'moment'
import type { HomeCurrentData } from '@/types/api'
import { initChart, setChartData } from '@/utils/charts'
import { HOME_API } from '@/lib/api'

const data = ref<HomeCurrentData | null>(null)
const racks = ref<Array<any>>([])
const salesChart = ref(salesChartJson)
const incomeChart = ref(IncomeChartJson)
const powerTransChart = ref(powerTransmissionChartJson)
const improvementChart = ref(improvementChartJson)
const isShow1 = ref<number>(0)
const isShow2 = ref<number>(0)
const swiperIdx = ref<any>(null)

const getHomeCurrent = async () => {
  try {
    const res = await HOME_API.fetchHomeData(2)
    data.value = res.data

    initChart(salesChart)
    setChartData(
      salesChart,
      data.value.sales_info.graph_data_list,
      'date_month',
      ['smp_ttl', 'rec_ttl']
    )

    initChart(powerTransChart)
    setChartData(
      powerTransChart,
      data.value.today_power_transfer_info.graph_trans_list,
      'time_hour',
      ['hourly_trans_kwh', 'hourly_invalid_kwh']
    )
  } catch (error) {
    console.error('Error in fetching home data:', error)
  }
}

const getRackStyle = (rack: { kWh: number }) => {
  const posY = getBgPosition(rack.kWh)
  return {
    backgroundPosition: `-10px ${posY}px`
  }
}

const getBgPosition = (percent: number) => {
  if (percent <= 20) return -254
  else if (percent <= 40) return -132
  else if (percent <= 60) return -71
  else if (percent <= 80) return -10
  else return -254
}

const swiperRef = (swiper: any) => {
  swiperIdx.value = swiper
}

const slidePrev = () => {
  swiperIdx.value?.slidePrev()
}

const slideNext = () => {
  swiperIdx.value?.slideNext()
}

onMounted(() => {
  getHomeCurrent()
})
</script>

<template>
  <div class="home-con">
    <div class="box">
      <div class="title">
        <p>
          <strong>오늘의 기상정보</strong> ({{
            data?.weather_info.area_name || '정보 없음'
          }})
          {{
            moment(
              `${data?.weather_info.base_date || ''}${data?.weather_info.base_time || ''}`,
              'YYYYMMDDHHmm'
            ).format('YYYY년 MM월 DD일 HH:mm')
          }}
        </p>
        <div class="rit-btn">
          <RouterLink to="/powerPlant/weather/chart">기상통계</RouterLink>
        </div>
      </div>
      <div class="item-box weather">
        <ul>
          <li :class="'sky-' + data?.weather_info.sky">
            <p>
              {{ data?.weather_info.sky_desc || '정보 없음' }}
              <strong>{{ returnToLocaleString(data?.weather_info.t1h) }}℃</strong>
            </p>
          </li>
          <li>
            <p>
              강수 <strong>{{ data?.weather_info.rn1 || '-' }}mm</strong>
            </p>
          </li>
          <li>
            <p>
              습도
              <strong>{{ returnToLocaleString(data?.weather_info.reh) }}%</strong>
            </p>
          </li>
          <li>
            <p>
              바람
              <strong>{{ returnToLocaleString(data?.weather_info.wsd) }}m/s</strong>
            </p>
          </li>
          <li>
            <p>
              일출 <strong>{{ formatTime(data?.weather_info.sunrise) }}</strong>
            </p>
          </li>
          <li>
            <p>
              일몰 <strong>{{ formatTime(data?.weather_info.sunset) }}</strong>
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="box">
      <div class="title">
        <p><strong>장치 현황</strong></p>
        <div class="rit-btn">
          <RouterLink to="/management/status">장치현황</RouterLink>
          <RouterLink to="/abnormal">이상징후</RouterLink>
        </div>
      </div>
      <div class="item-box power-plant">
        <ul>
          <li :class="data?.device_status.inverter_data_status === 'false'
              ? 'error'
              : 'active'
            ">
            <strong>전력발전</strong>
          </li>
          <li :class="data?.device_status.system_data_status ? 'active' : 'error'
            ">
            <strong>전력송전</strong>
          </li>
          <li :class="data?.device_status.device_data_status ? 'active' : 'error'
            ">
            <strong>전력저장</strong>
          </li>
        </ul>
        <p>
          {{
            data?.device_status?.error_message?.length &&
              data.device_status.error_message.length > 0
              ? data.device_status.error_message[0]
              : '모든 장치가 정상동작하고 있습니다.'
          }}
        </p>
      </div>
    </div>

    <div class="box">
      <div class="title">
        <div class="title-box">
          <p style="color: #fff"><strong>매출 분석</strong></p>
          <!-- <p :class="{ active: isShow1 === 0 }" @click="isShow1 = 0"><strong>매출 분석</strong></p> -->
          <!-- <p :class="{ active: isShow1 === 1 }" @click="isShow1 = 1"><strong>손익분기</strong></p> -->
        </div>
        <div class="rit-btn">
          <a v-if="isShow1 === 0">매출통계</a>
          <a v-if="isShow1 === 1">손익분기 통계</a>
        </div>
      </div>
      <div class="item-box sales" v-if="isShow1 === 0">
        <div class="chart-box">
          <highcharts type="chart" :options="salesChart"></highcharts>
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
                <th><strong>SMP 매출</strong></th>
                <th><strong>REC 매출</strong></th>
              </tr>
              <tr>
                <th>만원</th>
                <th>만원</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>오늘</th>
                <td class="right">
                  {{
                    returnToLocaleString(
                      data?.sales_info.sell_price_info_list?.[0]
                        .smp_sell_total_price
                    )
                  }}
                </td>
                <td class="right">
                  {{
                    returnToLocaleString(
                      data?.sales_info.sell_price_info_list?.[0]
                        ?.rec_sell_total_price
                    )
                  }}
                </td>
              </tr>
              <tr>
                <th>이번 달</th>
                <td class="right">
                  {{
                    returnToLocaleString(
                      data?.sales_info.sell_price_info_list?.[1]
                        .smp_sell_total_price
                    )
                  }}
                </td>
                <td class="right">
                  {{
                    returnToLocaleString(
                      data?.sales_info.sell_price_info_list?.[1]
                        .rec_sell_total_price
                    )
                  }}
                </td>
              </tr>
              <tr>
                <th>누적</th>
                <td class="right">
                  {{
                    returnToLocaleString(
                      data?.sales_info.sell_price_info_list?.[2]
                        .smp_sell_total_price
                    )
                  }}
                </td>
                <td class="right">
                  {{
                    returnToLocaleString(
                      data?.sales_info.sell_price_info_list?.[2]
                        .rec_sell_total_price
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="item-box analyze" v-if="isShow1 === 1">
        <div class="chart-box">
          <highcharts type="chart" :options="incomeChart"></highcharts>
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
                <th><strong>발전소 설립</strong></th>
                <th><strong>투자금</strong></th>
                <th><strong>운영기간</strong></th>
                <th><strong>손익분기</strong></th>
                <th><strong>누적매출</strong></th>
                <th><strong>손실금</strong></th>
                <th><strong>수익금</strong></th>
              </tr>
              <tr>
                <th>년/월</th>
                <th>만원</th>
                <th>년차</th>
                <th>년</th>
                <th>만원</th>
                <th>만원</th>
                <th>만원</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2020.01</td>
                <td>20,000</td>
                <td>3.09</td>
                <td>-</td>
                <td>20,000</td>
                <td>20,000</td>
                <td class="right">20,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="title">
        <div class="title-box">
          <p style="color: #fff"><strong>충전 현황</strong></p>
          <!-- <p :class="{ active: isShow2 === 0 }" @click="isShow2 = 0"><strong>충전 현황</strong></p> -->
          <!-- <p :class="{ active: isShow2 === 1 }" @click="isShow2 = 1"><strong>방전 현황</strong></p> -->
        </div>
        <div class="rit-btn">
          <a v-if="isShow2 === 0" href="powerPlant/production/current">충전현황</a>
          <a v-if="isShow2 === 1">방전현황</a>
        </div>
      </div>

      <div class="item-box power" v-if="isShow2 === 0">
        <div class="doughnut-box">
          <ul class="grid2">
            <li :style="{
              '--doughnut-value': `${(data?.today_powergen_info.today_power_gen || 0) * 1.8}deg`
            }">
              <dl>
                <dt>배터리로 충전되는 전력</dt>
                <dd>
                  {{
                    returnToLocaleString(
                      data?.today_powergen_info.today_power_gen
                    )
                  }}
                  <span>kW</span>
                </dd>
              </dl>
            </li>
            <li :style="{
              '--doughnut-value': `${(data?.today_powergen_info.total_power_gen.total_power_gen || 0) * 1.8}deg`
            }">
              <dl>
                <dt>누적 충전량</dt>
                <dd>
                  {{
                    returnToLocaleString(
                      data?.today_powergen_info.total_power_gen.total_power_gen
                    )
                  }}
                  <span>kWh</span>
                </dd>
              </dl>
            </li>
          </ul>
        </div>

        <div class="charge-con">
          <p class="prev" @click="slidePrev"></p>
          <div class="charge-box">
            <Swiper :slides-per-view="5" :space-between="34" :navigation="{ prevEl: '.prev', nextEl: '.next' }"
              :free-mode="true" @swiper="swiperRef">
              <SwiperSlide v-for="(
                  item, idx
                ) in data?.today_powergen_info.graph_gen_list.map(
                    (item, i) => ({
                      kWh: ((item.hourly_kwh / 50) * 100).toFixed(0),
                      rack: i + 1
                    })
                  )" :key="idx">
                <p :style="getRackStyle(item)">
                  <span>{{ `렉 ${item.rack}` }}</span>
                  <span>{{ `50kWh ${item.kWh}% 충전` }}</span>
                </p>
              </SwiperSlide>
            </Swiper>
          </div>
          <p class="next" @click="slideNext"></p>
        </div>
      </div>
      <div class="item-box analyze" v-if="isShow2 === 1"></div>
    </div>

    <div class="box">
      <div class="title">
        <p><strong>발전기 장치 현황</strong></p>
        <div class="rit-btn">
          <RouterLink to="/generation/production/Current">전력발전</RouterLink>
          <RouterLink to="">AI 발전량예측</RouterLink> 
        </div>
      </div>
      <div class="item-box power">
        <div class="doughnut-box">
          <ul>
            <li :class="['bg1', 'vector-1']" :style="{
              '--doughnut-value': `${(data?.current_device_info.current_power || 0) * 1.8}deg`,
              'padding-top': '40px'
            }">
              <dl>
                <dt>생산 전력</dt>
                <dd>
                  {{
                    returnToLocaleString(
                      data?.current_device_info.current_power || 0
                    )
                  }}
                  <span>kW</span>
                </dd>
              </dl>
            </li>
            <li :class="['bg1', 'vector-1']" :style="{
              '--doughnut-value': `${((data?.current_device_info.current_v || 0) / 500) * 100 * 1.8}deg`,
              'padding-top': '40px'
            }">
              <dl>
                <dt>전압</dt>
                <dd>
                  {{
                    returnToLocaleString(
                      data?.current_device_info.current_v || 0
                    )
                  }}
                  <span>V</span>
                </dd>
              </dl>
            </li>
            <li :class="['bg1', 'vector-1']" :style="{
              '--doughnut-value': `${(data?.current_device_info.current_a || 0) * 1.8}deg`,
              'padding-top': '40px'
            }">
              <dl>
                <dt>전류</dt>
                <dd>
                  {{
                    returnToLocaleString(
                      data?.current_device_info.current_a || 0
                    )
                  }}
                  <span>A</span>
                </dd>
              </dl>
            </li>
            <li :class="['bg2', 'no-vector']">
              <dl>
                <ProtractorChart class="chart" :value="returnToLocaleString(
                  data?.current_device_info.r_coil_temp || '0'
                )
                  " title="R 코일 온도" unit="℃" />
              </dl>
            </li>
            <li :class="['bg2', 'no-vector']">
              <dl>
                <ProtractorChart class="chart" :value="returnToLocaleString(
                  data?.current_device_info.s_coil_temp || '0'
                )
                  " title="S 코일 온도" unit="℃" />
              </dl>
            </li>
            <li :class="['bg2', 'no-vector']">
              <dl>
                <ProtractorChart class="chart" :value="returnToLocaleString(
                  data?.current_device_info.t_coil_temp || '0'
                )
                  " title="T 코일 온도" unit="℃" />
              </dl>
            </li>
            <li :class="['bg2', 'no-vector']">
              <dl>
                <ProtractorChart class="chart" :value="returnToLocaleString(
                  data?.current_device_info.back_bearing_temp || '0'
                )
                  " title="위 베어링 온도" unit="℃" />
              </dl>
            </li>
            <li :class="['bg2', 'no-vector']">
              <dl>
                <ProtractorChart class="chart" :value="returnToLocaleString(
                  data?.current_device_info.front_bearing_temp || '0'
                )
                  " title="앞 베어링 온도" unit="℃" />
              </dl>
            </li>
            <li :class="['bg2', 'no-vector']">
              <dl>
                <ProtractorChart class="chart" :value="returnToLocaleString(
                  data?.current_device_info.front_bearing_temp || '-'
                )
                  " title="뒤 베어링 온도" unit="℃" />
              </dl>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="title">
        <p><strong>오늘 송전 현황</strong></p>
        <div class="rit-btn">
          <RouterLink to="/transmit/smp/Current">전력송전</RouterLink>  
        </div>
      </div>

      <div class="item-box power">
        <div class="doughnut-box">
          <ul>
            <li :style="{
              '--doughnut-value': `${(data?.today_power_transfer_info.today_transfer_power || 0) * 1.8}deg`
            }">
              <dl>
                <dt>오늘 인버터 송전량</dt>
                <dd>
                  {{
                    returnToLocaleString(
                      data?.today_power_transfer_info.today_transfer_power || 0
                    )
                  }}
                  <span>kWh</span>
                </dd>
              </dl>
              <div>
                <p>어제 인버터 송전량</p>
                <span>{{
                  returnToLocaleString(
                    data?.today_power_transfer_info
                      .yesterday_transfer_power || 0
                  )
                }}kWh</span>
              </div>
            </li>
            <li :style="{
              '--doughnut-value': `${(data?.today_power_transfer_info.today_invalid_power || 0) * 1.8}deg`
            }">
              <dl>
                <dt>오늘 무효전력량</dt>
                <dd>
                  {{
                    returnToLocaleString(
                      data?.today_power_transfer_info.today_invalid_power || 0
                    )
                  }}
                  <span>kWh</span>
                </dd>
              </dl>
              <div>
                <p>어제 무효전력량</p>
                <span>{{
                  returnToLocaleString(
                    data?.today_power_transfer_info.yesterday_invalid_power ||
                    0
                  )
                }}kWh</span>
              </div>
            </li>
            <li :style="{
              '--doughnut-value': `${(data?.today_power_transfer_info.today_trans_per || 0) * 1.8}deg`
            }">
              <dl>
                <dt>오늘 AC/AC 변환율</dt>
                <dd>
                  {{
                    returnToLocaleString(
                      data?.today_power_transfer_info.today_trans_per || 0
                    )
                  }}
                  <span>%</span>
                </dd>
              </dl>
              <div>
                <p>어제 AC/AC 변환율</p>
                <span>{{
                  returnToLocaleString(
                    data?.today_power_transfer_info.yesterday_trans_per || 0
                  )
                }}%</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="chart-box">
          <highcharts type="chart" :options="powerTransChart"></highcharts>
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
                <th rowspan="2"><strong>구분</strong></th>
                <th><strong>인버터 송전량</strong></th>
                <th><strong>무효전력량</strong></th>
                <th><strong>AC/AC 변환율</strong></th>
              </tr>
              <tr>
                <th>MWh</th>
                <th>MWh</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(V, idx) in data?.today_power_transfer_info
                .today_power_transfer_dately_info_list || []" :key="V.date_type" :style="idx ===
                      (data?.today_power_transfer_info
                        .today_power_transfer_dately_info_list.length || 0) -
                      1
                      ? 'font-weight: bold;'
                      : ''
                    ">
                <td>{{ V.date_name }}</td>
                <td>{{ returnToLocaleString(V.transfer_power || 0) }}</td>
                <td>{{ returnToLocaleString(V.invalid_power || 0) }}</td>
                <td>{{ returnToLocaleString(V.trans_per || 0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="@/assets/styles/home.scss" />
