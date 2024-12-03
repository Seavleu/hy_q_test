
export const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "Auth" */ '../views/auth/Index.vue'),
    meta: { layout: 'PublicLayout', isPublic: true },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/Index.vue'),
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/setting/device',
    component: () => import(/* webpackChunkName: "Setting" */ '../views/setting/Index.vue'),
    meta: {
      title: '설정',
      path: '/setting'
    },
    children: [
      {
        path: '/setting/device',
        component: () => import(/* webpackChunkName: "SettingDevice" */ '../views/setting/Device.vue'),
        meta: {
          title: '장비알람설정'
        }
      },
      {
        path: '/setting/notification',
        component: () => import(/* webpackChunkName: "SettingNotification" */ '../views/setting/Device.vue'),
        meta: {
          title: '알림수신자설정'
        }
      },
      {
        path: '/setting/manager',
        component: () => import(/* webpackChunkName: "SettingManager" */ '../views/setting/Device.vue'),
        meta: {
          title: '담당자설정'
        }
      }
    ]
  },

  {
    path: '/',
    name: 'sub',
    children: [
      {
        path: '/schematic',
        name: 'schematic',
        component: () => import(/* webpackChunkName: "Schematic" */ '../views/schematic/Index.vue'),
        meta: { title: '전력계통도' },
      },
      {
        path: '/generation/production/current',
        meta: {
          title: '전력발전',
          path: '/generation/',
          sideClass: 'power-plant'
        },
        children: [
          {
            path: '/generation/production/current',
            component: () => import(/* webpackChunkName: "ProductionPower" */ '../views/generation/production/Current.vue'),
            meta: {
              title: '생산전력량',
              path: 'generation/production'
            },
            children: [
              {
                path: '/generation/production/current',
                component: () => import(/* webpackChunkName: "ProductionPowerCurrent" */ '../views/generation/production/Current.vue'),
                meta: {
                  title: '생산전력량 현황'
                }
              },
              {
                path: '/generation/production/chart',
                component: () => import(/* webpackChunkName: "ProductionPowerChart" */ '../views/generation/production/Chart.vue'),
                meta: {
                  title: '생산전력량 차트'
                }
              }
            ]
          },
          {
            path: '/generation/invalidity/current',
            component: () => import(/* webpackChunkName: "InvalidityPower" */ '../views/generation/invalidity/Current.vue'),
            meta: {
              title: '무효전력량',
              path: 'generation/invalidity'
            },
            children: [
              {
                path: '/generation/invalidity/current',
                component: () => import(/* webpackChunkName: "InvalidityCurrent" */ '../views/generation/invalidity/Current.vue'),
                meta: {
                  title: '무효전력량 현황'
                }
              },
              {
                path: '/generation/invalidity/chart',
                component: () => import(/* webpackChunkName: "InvalidityPowerChart" */ '../views/generation/invalidity/Chart.vue'),
                meta: {
                  title: '무효전력량 차트'
                }
              }
            ]
          },
          {
            path: '/generation/weather/current',
            component: () => import(/* webpackChunkName: "Weather" */ '../views/generation/weather/Current.vue'),
            meta: {
              title: '기상관측',
              path: 'generation/weather'
            },
            children: [
              {
                path: '/generation/weather/current',
                component: () => import(/* webpackChunkName: "WeatherCurrent" */ '../views/generation/weather/Current.vue'),
                meta: {
                  title: '기상관측 현황'
                }
              },
              {
                path: '/generation/weather/chart',
                component: () => import(/* webpackChunkName: "WeatherPowerChart" */ '../views/generation/weather/Chart.vue'),
                meta: {
                  title: '기상관측 차트'
                }
              }
            ]
          },
          {
            path: '/generation/generation',
            component: () => import(/* webpackChunkName: "PowerGeneration" */ '../views/generation/forecast/Index.vue'),
            meta: {
              title: '발전량예측'
            }
          }
        ]
      },
    ]
  }, 
];

// if (process.env.NODE_ENV !== 'production') {
//   // routes.push(
//   //     {
//   //         name: 'DevPage',
//   //         path: '/devPage',
//   //         component: import(/* webpackChunkName: "DevPage" */ '../views/devBox/DevPage.vue'),
//   //         meta: {
//   //             requireAuth: false
//   //         }
//   //     }
//   // )
// }
