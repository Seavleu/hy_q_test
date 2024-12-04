export const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "Auth" */ '@/views/auth/Index.vue'),
    meta: { layout: 'PublicLayout', isPublic: true },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Index.vue'),
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/setting/device',
    component: () => import(/* webpackChunkName: "Setting" */ '@/views/setting/Index.vue'),
    meta: {
      title: '설정',
      path: '/setting'
    },
    children: [
      {
        path: '/setting/device',
        component: () => import(/* webpackChunkName: "SettingDevice" */ '@/views/setting/Device.vue'),
        meta: {
          title: '장비알람설정'
        }
      },
      {
        path: '/setting/notification',
        component: () => import(/* webpackChunkName: "SettingNotification" */ '@/views/setting/Device.vue'),
        meta: {
          title: '알림수신자설정'
        }
      },
      {
        path: '/setting/manager',
        component: () => import(/* webpackChunkName: "SettingManager" */ '@/views/setting/Device.vue'),
        meta: {
          title: '담당자설정'
        }
      }
    ]
  },
  // ** 전력발전 ** //
  {
    path: '/',
    name: 'sub',
    children: [
      {
        path: '/schematic',
        name: 'schematic',
        component: () => import(/* webpackChunkName: "Schematic" */ '@/views/schematic/Index.vue'),
        meta: { title: '전력계통도' },
      },
      {
        path: '/generation',
        name: 'power-generation',
        meta: { title: '전력발전' },
        children: [
          {
            path: '/generation/invalidity',
            component: () => import(/* webpackChunkName: "InvalidityBaseView" */ '@/components/shared/TabNav.vue'),
            meta: {
              title: '무효전력량',
              tabData: [
                { title: '현황', path: '/generation/invalidity/current' },
                { title: '통계차트', path: '/generation/invalidity/chart' },
              ],
            },
            children: [
              {
                path: 'current',
                component: () => import(/* webpackChunkName: "InvalidityCurrent" */ '@/views/generation/invalidity/Current.vue'),
                meta: { title: '현황' },
              },
              {
                path: 'chart',
                component: () => import(/* webpackChunkName: "InvalidityChart" */ '@/views/generation/invalidity/Chart.vue'),
                meta: { title: '통계차트' },
              },
            ],
          },
          {
            path: '/generation/production',
            component: () => import(/* webpackChunkName: "ProductionBaseView" */ '@/components/shared/TabNav.vue'),
            meta: {
              title: '생산전력량',
              tabData: [
                { title: '현황', path: '/generation/production/current' },
                { title: '통계차트', path: '/generation/production/chart' },
              ],
            },
            children: [
              {
                path: 'current',
                component: () => import(/* webpackChunkName: "ProductionCurrent" */ '@/views/generation/production/Current.vue'),
                meta: { title: '현황' },
              },
              {
                path: 'chart',
                component: () => import(/* webpackChunkName: "ProductionChart" */ '@/views/generation/production/Chart.vue'),
                meta: { title: '통계차트' },
              },
            ],
          },
          {
            path: '/generation/weather',
            component: () => import(/* webpackChunkName: "WeatherBaseView" */ '@/components/shared/TabNav.vue'),
            meta: {
              title: '기상관측',
              tabData: [
                { title: '현황', path: '/generation/weather/current' },
                { title: '통계차트', path: '/generation/weather/chart' },
              ],
            },
            children: [
              {
                path: 'current',
                component: () => import(/* webpackChunkName: "WeatherCurrent" */ '@/views/generation/weather/Current.vue'),
                meta: { title: '현황' },
              },
              {
                path: 'chart',
                component: () => import(/* webpackChunkName: "WeatherChart" */ '@/views/generation/weather/Chart.vue'),
                meta: { title: '통계차트' },
              },
            ],
          },
          {
            path: '/generation/forecast',
            component: () => import(/* webpackChunkName: "ForecastView" */ '@/components/shared/TabNav.vue'),
            meta: {
              title: '기상관측',
            },
          },
        ],
      },

      // ** 전력송전 ** //
      {
        path: '/transmit',
        name: 'power-transmit',
        meta: { title: '전력송전' },
        children: [
          {
            path: '/transmit/rec',
            component: () => import(/* webpackChunkName: "Rec" */ '@/components/shared/TabNav.vue'),
            meta: {
              title: '무효전력량',
              tabData: [
                { title: '현황', path: '/transmit/rec/current' },
                { title: '통계차트', path: '/transmit/rec/chart' },
              ],
            },
            children: [
              {
                path: 'current',
                component: () => import(/* webpackChunkName: "RecCurrent" */ '@/views/transmit/rec/Current.vue'),
                meta: { title: '현황' },
              },
              {
                path: 'chart',
                component: () => import(/* webpackChunkName: "RecChart" */ '@/views/transmit/rec/Chart.vue'),
                meta: { title: '통계차트' },
              },
            ],
          },
          {
            path: '/transmit/smp',
            component: () => import(/* webpackChunkName: "Smp" */ '@/components/shared/TabNav.vue'),
            meta: {
              title: '생산전력량',
              tabData: [
                { title: '현황', path: '/transmit/smp/current' },
                { title: '통계차트', path: '/transmit/smp/chart' },
              ],
            },
            children: [
              {
                path: 'current',
                component: () => import(/* webpackChunkName: "SmpCurrent" */ '@/views/transmit/smp/Current.vue'),
                meta: { title: '현황' },
              },
              {
                path: 'chart',
                component: () => import(/* webpackChunkName: "SmpChart" */ '@/views/transmit/smp/Chart.vue'),
                meta: { title: '통계차트' },
              },
            ],
          },
          {
            path: '/transmit/trends',
            component: () => import(/* webpackChunkName: "Trends" */ '@/views/transmit/trends/Index.vue'),
            meta: {
              title: '기상관측',
            },
          }, 
        ],
      },

      // ** 장치관리 ** //
      {
        path: '/management',
        name: 'device-management',
        meta: { title: '장치관리' },
        children: [
          {
            path: '/management/status',
            component: () => import(/* webpackChunkName: "StatusManagement" */ '@/views/management/status/Index.vue'),
            meta: {
              title: '장치 현황',
            },
          },
          {
            path: '/management/alarm',
            component: () => import(/* webpackChunkName: "AlarmManagement" */ '@/views/management/alarm/Index.vue'),
            meta: {
              title: '문제알람 이력',
            },
          },
          {
            path: '/management/problem',
            component: () => import(/* webpackChunkName: "ProblemManagement" */ '@/components/shared/TabNav.vue'),
            meta: {
              title: '문제조치',
              tabData: [
                { title: '이력', path: '/management/problem/record' },
                { title: '등록', path: '/management/problem/registration' },
              ],
            },
            children: [
              {
                path: 'record',
                component: () => import(/* webpackChunkName: "ProblemRecordManagement" */ '@/views/management/problem/history/Index.vue'),
                meta: { title: '이력' },
              },
              {
                path: 'registration',
                component: () => import(/* webpackChunkName: "ProblemRegistrationManagement" */ '@/views/management/problem/Register.vue'),
                meta: { title: '등록' },
              },
            ],
          },
          {
            path: '/management/inspect',
            component: () => import(/* webpackChunkName: "InspectManagement" */ '@/components/shared/TabNav.vue'),
            meta: {
              title: '정기점검',
              tabData: [
                { title: '이력', path: '/management/inspect/record' },
                { title: '등록', path: '/management/inspect/registration' },
              ],
            },
            children: [
              {
                path: 'record',
                component: () => import(/* webpackChunkName: "InspectRecordManagement" */ '@/views/management/inspect/history/Index.vue'),
                meta: { title: '이력' },
              },
              {
                path: 'registration',
                component: () => import(/* webpackChunkName: "InspectRegistrationManagement" */ '@/views/management/inspect/Register.vue'),
                meta: { title: '등록' },
              },
            ],
          },
        ],
      },

      // ** 이상징후 ** //
      {
        path: '/abnormal',
        name: 'abnormalSign-detection',
        meta: { title: '이상징후' },
      },

      // ** 보고서 ** // 
      {
        path: '/report',
        name: 'report-files',
        meta: { title: '보고서' },
      },
    ]
  },
];

// if (process.env.NODE_ENV !== 'production') {
//   // routes.push(
//   //     {
//   //         name: 'DevPage',
//   //         path: '/devPage',
//   //         component: import(/* webpackChunkName: "DevPage" */ '@/views/devBox/DevPage.vue'),
//   //         meta: {
//   //             requireAuth: false
//   //         }
//   //     }
//   // )
// }
