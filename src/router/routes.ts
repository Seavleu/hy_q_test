export const routes = [
  {
    path: '/auth', 
    name: 'auth', 
    component: () => import(/* webpackChunkName: "AuthIndex" */ '../views/auth/Index.vue'),
    meta: {
      isPublic: true
    }
  }
]
