<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { GENERATION_API } from '@/lib/api'
import { useFetchData } from '@/composables/useFetchData' 
import chartJson from '@/assets/json/charts/production/weatherChart0.json'
import columnJson from '@/assets/json/charts/production/weatherChart1.json'
import chartJson0 from '@/assets/json/charts/production/weatherChart2.json'
import moment from 'moment'

const { data: weatherData, fetchData: fetchWeatherData, isLoading } = useFetchData(
  GENERATION_API.weatherCurrent,
  { plant_seq: 2 }
)
 
const chart = ref({ ...chartJson })
const columnChart = ref({ ...columnJson })
const chart0 = ref({ ...chartJson0 })
const colspan = ref(0)
const fcstDate = ref('weatherforcast')
const chartType = ref('line')
const modalIsOpen = ref(false)
 
const setChart = () => {
  const currentData = weatherData.value?.weatherforcast || []
  colspan.value = currentData.length

  chart.value.series[0].data = []
  columnChart.value.series[0].data = []
  chart0.value.series[0].data = []

  currentData.forEach((V: any) => {
    chart.value.series[0].data.push(Number(V.tmp))
    columnChart.value.series[0].data.push(Number(V.pop))
    chart0.value.series[0].data.push(Number(V.wsd))
  })
}
 
watch(weatherData, () => {
  if (weatherData.value) setChart()
})
 
onMounted(() => {
  fetchWeatherData()
})
 
const formatTime = (time: string) => moment(time, 'HHmm').format('HH:mm')
const closeWeatherModal = () => {
  modalIsOpen.value = false
}
/*
const map = ref<any>(null)
const initMap = () => {
  map.value = new kakao.maps.Map(document.getElementById('map'), {
    center: new kakao.maps.LatLng(36.49118831994895, 128.02474633909807),
    level: 13,
  })
}

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap()
  } else {
    const script = document.createElement('script')
    script.onload = () => kakao.maps.load(initMap)
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1ea9040ea9fb2662541d4967e535205f'
    document.head.appendChild(script)
  }
})
*/
</script>


<template>
  <div class="weather-con">
    <div class="sub-title">
      <dl>
        <dt>기상관측 현황</dt>
        <dd>
          [장흥군 대덕읍]의 <span>{{ moment().format('YYYY년 M월 D일') }}(오늘)</span> 실시간 기상관측 정보 및 예보를 확인할 수 있습니다.
        </dd>
      </dl>
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="weatherData?.weatherInfo" class="current-con"> 
      <div class="map-con">
        <div class="map-box">
          <div id="map"></div>
        </div>
        <div class="map-data" >
          <div class="location">
            <dl>
              <dt>{{ weatherData.weatherInfo?.area_name }}</dt>
              <!-- TODO: Convert date to locale-KR -->
              <dd>
                {{ moment(weatherData.weatherInfo?.base_date).format('MM.DD.(ddd)') }}
                {{ formatTime(weatherData.weatherInfo?.base_time) }} 갱신
              </dd>
            </dl>
            <v-combobox :items="['한 곳 이상일때']" variant="outlined" placeholder="선택" style="min-width: 120px"></v-combobox>
          </div>
          <div class="sun-up-down">
            <ul>
              <li>
                <span>일출 {{ formatTime(weatherData.weatherInfo?.sunrise) }}</span>
              </li>
              <li>
                <span>일몰 {{ formatTime(weatherData.weatherInfo?.sunset) }}</span>
              </li>
            </ul>
          </div>
          <div class="current_weather">
            <div class="ico_top" :class="'sky-' + weatherData.weatherInfo?.sky">
              <p>
                {{ weatherData.weatherInfo?.sky_desc }}<br />
                <strong>{{ weatherData.weatherInfo?.t1h }} <span>℃</span></strong
                ><br />
                {{
                  `${Math.round(Math.abs(weatherData.weatherInfo?.t1h - weatherData.weatherInfo?.yesterday_t1h) * 10) / 10}℃ 
                ${weatherData.weatherInfo?.t1h - weatherData.weatherInfo?.yesterday_t1h >= 0 ? '높아요' : '낮아요'}`
                }}
              </p>
            </div>
            <ul>
              <li>
                습도
                <span
                  ><strong>{{ weatherData.weatherInfo?.reh }}</strong
                  >%</span
                >
              </li>
              <li>
                바람
                <span
                  ><strong>{{ `${weatherData.weatherInfo?.vec_name} ${weatherData.weatherInfo?.wsd}` }}</strong
                  >m/s</span
                >
              </li>
              <li>
                1시간강수량
                <span
                  ><strong>{{ weatherData.weatherInfo?.rn1 }}</strong
                  >mm</span
                >
              </li>
            </ul>
            <p class="txt">
              {{
                weatherData.weatherInfo?.fine_dust > 0
                  ? `해당지역에 ${weatherData.weatherInfo?.fine_dust}개의 특보가 발효되었습니다.`
                  : '해당지역에 발효중인 특보가 없습니다.'
              }}
            </p>
          </div>
          <div class="circus-box">
            <ul>
              <li>
                {{ weatherData.weatherInfo?.pm25value }} ㎍/m³<br />
                <strong>{{ weatherData.weatherInfo?.pm25_desc }}</strong
                ><br />
                초미세먼지<br />
                (PM2.5)
              </li>
              <li>
                {{ weatherData.weatherInfo?.pm10value }} ㎍/m³<br />
                <strong>{{ weatherData.weatherInfo?.pm10_desc }}</strong
                ><br />
                미세먼지<br />
                (PM2.5)
              </li>
              <li>
                {{ weatherData.weatherInfo?.o3value }} ppm<br />
                <strong>{{ weatherData.weatherInfo?.o3value }}</strong
                ><br />
                오존<br />
                (O3)
              </li>
            </ul>
            <dl>
              <dt>
                진도측정소(도시대기)
                {{ moment(weatherData.weatherInfo?.base_date).format('MM.DD (ddd)') }}
                {{ formatTime(weatherData.weatherInfo?.base_time) }} 갱신
              </dt>
              <dd>정보출처: 대기질정보(한국환경공단), 일출일몰정보(한국천문연구원)</dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="chart-tbl-con">
        <div class="tab">
          <ul>
            <li :class="{ active: fcstDate === 'weatherforcast' }" @click="fcstDate = 'weatherforcast'">
              <a><strong>오늘</strong></a>
            </li>
            <li :class="{ active: fcstDate === 'weatherforcastTomorrow' }" @click="fcstDate = 'weatherforcastTomorrow'">
              <a><strong>내일</strong></a>
            </li>
            <li :class="{ active: fcstDate === 'weatherforcastafterTomorrow' }" @click="fcstDate = 'weatherforcastafterTomorrow'">
              <a><strong>모레</strong></a>
            </li>
          </ul>
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

        <div v-if="fcstDate === 'weatherforcast'">
          <template v-if="chartType === 'line'">
            <div class="table-box chart-tbl">
              <div class="tbl">
                <table>
                  <tbody>
                    <tr>
                      <th>시각</th>
                      <td v-for="V in weatherData.weatherforcast" :key="V.fcst_time">{{ formatTime(V.fcst_time) }}시</td>
                    </tr>
                    <tr>
                      <th>날씨</th>
                      <td v-for="V in weatherData.weatherforcast" :key="V.fcst_time" :class="`sky-${V.sky}`"></td>
                    </tr>
                    <tr>
                      <th>기온</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px; margin-bottom: -14px">
                          <highcharts type="chart" :options="chart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>체감온도</th>
                      <td v-for="V in weatherData.weatherforcast" :key="V.fcst_time">{{ V.pt }}℃</td>
                    </tr>
                    <tr class="circle">
                      <th>강수량<br />(mm)</th>
                      <td v-for="V in weatherData.weatherforcast" :key="V.fcst_time">
                        <span>{{ V.pcp === '강수없음' ? '-' : V.pcp.slice(0, -2) }}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>강수확률</th>
                      <td v-for="V in weatherData.weatherforcast" :key="V.fcst_time">{{ V.pop }}%</td>
                    </tr>
                    <tr class="border-topbtm">
                      <th>바람<br />(m/s)</th>
                      <td v-for="V in weatherData.weatherforcast" :key="V.fcst_time">
                        <p
                          :style="{
                            '--arrow-value': `${V.vec}deg`
                          }"
                        >
                          {{ V.wsd }}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>습도</th>
                      <td v-for="V in weatherData.weatherforcast" :key="V.fcst_time">{{ V.reh }}%</td>
                    </tr>
                    <tr>
                      <th>폭염영향</th>
                      <td v-for="V in weatherData[fcstDate]" :key="V.fcst_time">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <template v-else-if="chartType === 'bar'">
            <div class="table-box chart-tbl">
              <div class="tbl">
                <table>
                  <tbody>
                    <tr>
                      <th>시각</th>
                      <td v-for="V in weatherData.weatherforcast" :key="V.fcst_time">{{ formatTime(V.fcst_time) }}시</td>
                    </tr>
                    <tr>
                      <th>날씨</th>
                      <td v-for="V in weatherData.weatherforcast" :key="V.fcst_time" :class="`sky-${V.sky}`"></td>
                    </tr>
                    <tr>
                      <th>기온</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px; margin-bottom: -14px">
                          <highcharts type="chart" :options="chart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th class="border-bot">강수확률</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px; margin-bottom: -14px">
                          <highcharts type="chart" :options="columnChart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr class="border-topbtm">
                      <th>바람<br />(m/s)</th>
                      <td v-for="V in weatherData.weatherforcast" :key="V.fcst_time">
                        <p
                          :style="{
                            '--arrow-value': `${V.vec}deg`
                          }"
                        >
                          {{ V.wsd }}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>습도</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px">
                          <highcharts type="chart" :options="chart0"></highcharts>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <template v-else-if="chartType === 'day'">
            <div class="table-box day-tbl">
              <div class="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>시각</th>
                      <th>날씨</th>
                      <th>기온 (체감)</th>
                      <th>강수량</th>
                      <th>강수확률</th>
                      <th>바람</th>
                      <th>습도</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="V in weatherData.weatherforcast" :key="V.fcst_time">
                      <td>{{ formatTime(V.fcst_time) }}시</td>
                      <td class="img" :class="'sky-' + V.sky">{{ V.sky_desc }}</td>
                      <td>{{ V.tmp }}℃ ({{ V.pt }}℃)</td>
                      <td>{{ V.pcp }}</td>
                      <td>{{ V.pop }}%</td>
                      <td>{{ V.vec_name }} {{ V.wsd }}m/s</td>
                      <td>{{ V.reh }}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>
        <div v-if="fcstDate === 'weatherforcastTomorrow'">
          <template v-if="chartType === 'line'">
            <div class="table-box chart-tbl">
              <div class="tbl">
                <table>
                  <tbody>
                    <tr>
                      <th>시각</th>
                      <td v-for="V in weatherData.weatherforcastTomorrow" :key="V.fcst_time">{{ formatTime(V.fcst_time) }}시</td>
                    </tr>
                    <tr>
                      <th>날씨</th>
                      <td v-for="V in weatherData.weatherforcastTomorrow" :key="V.fcst_time" :class="`sky-${V.sky}`"></td>
                    </tr>
                    <tr>
                      <th>기온</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px; margin-bottom: -14px">
                          <highcharts type="chart" :options="chart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>체감온도</th>
                      <td v-for="V in weatherData.weatherforcastTomorrow" :key="V.fcst_time">{{ V.pt }}℃</td>
                    </tr>
                    <tr class="circle">
                      <th>강수량<br />(mm)</th>
                      <td v-for="V in weatherData.weatherforcastTomorrow" :key="V.fcst_time">
                        <span>{{ V.pcp === '강수없음' ? '-' : V.pcp.slice(0, -2) }}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>강수확률</th>
                      <td v-for="V in weatherData.weatherforcastTomorrow" :key="V.fcst_time">{{ V.pop }}%</td>
                    </tr>
                    <tr class="border-topbtm">
                      <th>바람<br />(m/s)</th>
                      <td v-for="V in weatherData.weatherforcastTomorrow" :key="V.fcst_time">
                        <p
                          :style="{
                            '--arrow-value': `${V.vec}deg`
                          }"
                        >
                          {{ V.wsd }}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>습도</th>
                      <td v-for="V in weatherData.weatherforcastTomorrow" :key="V.fcst_time">{{ V.reh }}%</td>
                    </tr>
                    <tr>
                      <th>폭염영향</th>
                      <td v-for="V in weatherData[fcstDate]" :key="V.fcst_time">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <template v-else-if="chartType === 'bar'">
            <div class="table-box chart-tbl" v-if="fcstDate === 'weatherforcastTomorrow'">
              <div class="tbl">
                <table>
                  <tbody>
                    <tr>
                      <th>시각</th>
                      <td v-for="V in weatherData.weatherforcastTomorrow" :key="V.fcst_time">{{ formatTime(V.fcst_time) }}시</td>
                    </tr>
                    <tr>
                      <th>날씨</th>
                      <td v-for="V in weatherData.weatherforcastTomorrow" :key="V.fcst_time" :class="`sky-${V.sky}`"></td>
                    </tr>
                    <tr>
                      <th>기온</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px; margin-bottom: -14px">
                          <highcharts type="chart" :options="chart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr class="border-btm">
                      <th>강수확률</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -9px; margin-bottom: -16px">
                          <highcharts type="chart" :options="columnChart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr class="border-btm">
                      <th>풍량<br />풍속<br />(m/s)</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px; margin-bottom: -14px">
                          <highcharts type="chart" :options="chart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>습도</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px">
                          <highcharts type="chart" :options="chart0"></highcharts>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <template v-else-if="chartType === 'day'">
            <div class="table-box day-tbl">
              <div class="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>시각</th>
                      <th>날씨</th>
                      <th>기온 (체감)</th>
                      <th>강수량</th>
                      <th>강수확률</th>
                      <th>바람</th>
                      <th>습도</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="V in weatherData.weatherforcastTomorrow" :key="V.fcst_time">
                      <td>{{ formatTime(V.fcst_time) }}시</td>
                      <td class="img" :class="'sky-' + V.sky">{{ V.sky_desc }}</td>
                      <td>{{ V.tmp }}℃ ({{ V.pt }}℃)</td>
                      <td>{{ V.pcp }}</td>
                      <td>{{ V.pop }}%</td>
                      <td>{{ V.vec_name }} {{ V.wsd }}m/s</td>
                      <td>{{ V.reh }}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>
        <div v-if="fcstDate === 'weatherforcastafterTomorrow'">
          <template v-if="chartType === 'line'">
            <div class="table-box chart-tbl">
              <div class="tbl">
                <table>
                  <tbody>
                    <tr>
                      <th>시각</th>
                      <td v-for="V in weatherData.weatherforcastafterTomorrow" :key="V.fcst_time">{{ formatTime(V.fcst_time) }}시</td>
                    </tr>
                    <tr>
                      <th>날씨</th>
                      <td v-for="V in weatherData.weatherforcastafterTomorrow" :key="V.fcst_time" :class="`sky-${V.sky}`"></td>
                    </tr>
                    <tr>
                      <th>기온</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px; margin-bottom: -14px">
                          <highcharts type="chart" :options="chart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>체감온도</th>
                      <td v-for="V in weatherData.weatherforcastafterTomorrow" :key="V.fcst_time">{{ V.pt }}℃</td>
                    </tr>
                    <tr class="circle">
                      <th>강수량<br />(mm)</th>
                      <td v-for="V in weatherData.weatherforcastafterTomorrow" :key="V.fcst_time">
                        <span>{{ V.pcp === '강수없음' ? '-' : V.pcp.slice(0, -2) }}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>강수확률</th>
                      <td v-for="V in weatherData.weatherforcastafterTomorrow" :key="V.fcst_time">{{ V.pop }}%</td>
                    </tr>
                    <tr class="border-topbtm">
                      <th>바람<br />(m/s)</th>
                      <td v-for="V in weatherData.weatherforcastafterTomorrow" :key="V.fcst_time">
                        <p
                          :style="{
                            '--arrow-value': `${V.vec}deg`
                          }"
                        >
                          {{ V.wsd }}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>습도</th>
                      <td v-for="V in weatherData.weatherforcastafterTomorrow" :key="V.fcst_time">{{ V.reh }}%</td>
                    </tr>
                    <tr>
                      <th>폭염영향</th>
                      <td v-for="V in weatherData[fcstDate]" :key="V.fcst_time">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <template v-else-if="chartType === 'bar'">
            <div class="table-box chart-tbl" v-if="fcstDate === 'weatherforcastafterTomorrow'">
              <div class="tbl">
                <table>
                  <tbody>
                    <tr>
                      <th>시각</th>
                      <td v-for="V in weatherData.weatherforcastafterTomorrow" :key="V.fcst_time">{{ formatTime(V.fcst_time) }}시</td>
                    </tr>
                    <tr>
                      <th>날씨</th>
                      <td v-for="V in weatherData.weatherforcastafterTomorrow" :key="V.fcst_time" :class="`sky-${V.sky}`"></td>
                    </tr>
                    <tr>
                      <th>기온</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px; margin-bottom: -14px">
                          <highcharts type="chart" :options="chart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr class="border-btm">
                      <th>강수확률</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -9px; margin-bottom: -16px">
                          <highcharts type="chart" :options="columnChart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr class="border-btm">
                      <th>풍량<br />풍속<br />(m/s)</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px; margin-bottom: -14px">
                          <highcharts type="chart" :options="chart"></highcharts>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>습도</th>
                      <td :colspan="colspan" class="chart">
                        <div style="margin-top: -8px">
                          <highcharts type="chart" :options="chart0"></highcharts>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <template v-else-if="chartType === 'day'">
            <div class="table-box day-tbl" v-if="fcstDate === 'weatherforcastafterTomorrow'">
              <div class="tit"><strong>6일(수)</strong> 최저 <span class="cor0">~</span> / <span class="cor1">25℃</span> 최고</div>
              <div class="tbl">
                <table>
                  <colgroup>
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>시각</th>
                      <th>날씨</th>
                      <th>기온 (체감)</th>
                      <th>강수량</th>
                      <th>강수확율</th>
                      <th>바람</th>
                      <th>습도</th>
                      <th>폭염 영향</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="V in weatherData.weatherforcastafterTomorrow" :key="V.fcst_time">
                      <td>{{ moment(V.fcst_time, 'HHmm').format('HH') }}시</td>
                      <td class="img" :class="'sky-' + V.sky">{{ V.sky_desc }}</td>
                      <td>{{ V.tmp }}℃ ({{ V.pt }}℃)</td>
                      <td>{{ V.pcp }}</td>
                      <td>{{ V.pop }}%</td>
                      <td>{{ V.vec_name }} {{ V.wsd }}m/s</td>
                      <td>{{ V.reh }}%</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <v-dialog v-model="modalIsOpen" width="auto">
      <!-- <WeatherModal :closeWeatherModal="closeWeatherModal" /> -->
       WeatherModal
    </v-dialog>
  </div>
</template>

<style scoped lang="scss" src="@/assets/styles/generation.scss" />
