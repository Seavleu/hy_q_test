export const routes = [
  {
    path: '/login', 
    name: 'login', 
    component: () => import(/* webpackChunkName: "AuthIndex" */ '../views/auth/Index.vue'),
    meta: {
      isPublic: true
    }
  }
]
