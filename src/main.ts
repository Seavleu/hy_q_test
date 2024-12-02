import './assets/styles/base.scss'
import './assets/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useCookies } from 'vue3-cookies'

import Vue3Lottie from 'vue3-lottie'
import HighchartsVue from 'highcharts-vue' 
import 'vuetify/styles'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import 'swiper/css'
import VueIframe from 'vue-iframes'
import moment from 'moment'
import App from './App.vue'
import router from './router'
import http from './lib/axios'
import vuetify from './lib/vuetify'
import { sockets, ws } from './lib/websocket'

const app = createApp(App).use(router)

app.use(createPinia()) 
app.use(vuetify)
app.use(HighchartsVue)
app.use(Vue3Lottie)
app.use(setupCalendar, {})
app.use(VueIframe)

const { cookies } = useCookies()

app.config.globalProperties.$cookies = cookies
app.config.globalProperties.$http = http
app.config.globalProperties.$moment = moment
app.config.globalProperties.$sockets = sockets

app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

app.mount('#app')
