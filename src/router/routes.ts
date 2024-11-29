import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "Auth" */ '../views/auth/Index.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/Index.vue'),
    meta: { sideClass: 'home' },
  },
  {
    path: '/schematic',
    name: 'schematic',
    component: () => import(/* webpackChunkName: "Schematic" */ '../views/schematic/Index.vue'),
    meta: { title: '전력계통도' },
  },
  {
    path: '/generation/production',
    name: 'production',
    component: () => import(/* webpackChunkName: "ProductionPower" */ '../views/generation/production/Index.vue'),
    meta: { title: '생산전력량', sideClass: 'power-plant' },
    children: [
      {
        path: 'current',
        name: 'production-current',
        component: () => import(/* webpackChunkName: "ProductionPowerCurrent" */ '../views/generation/production/Current.vue'),
        meta: { title: '생산전력량 현황' },
      },
      {
        path: 'chart',
        name: 'production-chart',
        component: () => import(/* webpackChunkName: "ProductionPowerChart" */ '../views/generation/production/Chart.vue'),
        meta: { title: '생산전력량 차트' },
      },
    ],
  },
  {
    path: '/generation/invalidity',
    name: 'invalidity',
    component: () => import(/* webpackChunkName: "InvalidityPower" */ '../views/generation/invalidity/Index.vue'),
    meta: { title: '무효전력량', sideClass: 'power-plant' },
    children: [
      {
        path: 'current',
        name: 'invalidity-current',
        component: () => import(/* webpackChunkName: "InvalidityCurrent" */ '../views/generation/invalidity/Current.vue'),
        meta: { title: '무효전력량 현황' },
      },
      {
        path: 'chart',
        name: 'invalidity-chart',
        component: () => import(/* webpackChunkName: "InvalidityPowerChart" */ '../views/generation/invalidity/Chart.vue'),
        meta: { title: '무효전력량 차트' },
      },
    ],
  },
  {
    path: '/generation/weather',
    name: 'weather',
    component: () => import(/* webpackChunkName: "Weather" */ '../views/generation/weather/Index.vue'),
    meta: { title: '기상관측', sideClass: 'power-plant' },
    children: [
      {
        path: 'current',
        name: 'weather-current',
        component: () => import(/* webpackChunkName: "WeatherCurrent" */ '../views/generation/weather/Current.vue'),
        meta: { title: '기상관측 현황' },
      },
      {
        path: 'chart',
        name: 'weather-chart',
        component: () => import(/* webpackChunkName: "WeatherPowerChart" */ '../views/generation/weather/Chart.vue'),
        meta: { title: '기상관측 차트' },
      },
    ],
  },
  {
    path: '/generation/forecast',
    name: 'forecast',
    component: () => import(/* webpackChunkName: "PowerGeneration" */ '../views/generation/forecast/Index.vue'),
    meta: { title: '발전량예측', sideClass: 'power-plant' },
  },
];
