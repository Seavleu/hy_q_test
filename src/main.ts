import './assets/styles/base.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useCookies } from 'vue3-cookies'
import HighchartsVue from 'highcharts-vue'

import App from './App.vue'
import router from './router'
import http from './lib/axios' 
import vuetify from './lib/vuetify'

import 'vuetify/styles' 

import VueIframe from 'vue-iframes'

const app = createApp(App)
 
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(HighchartsVue)
 
const { cookies } = useCookies()

app.config.globalProperties.$cookies = cookies
app.config.globalProperties.$http = http
 
app.mount('#app')
