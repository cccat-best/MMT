import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: () => import('../views/register/register.vue')
  },
  {
    path: '/home',
    component: () => import('../views/home/home.vue'),
    children: [
      // {
      //   path: '',
      //   component: () => import(''),
      // },
      // {
      //   path: '',
      //   component: () => import(''),
      // },
      {
        path: 'arrangement',
        component: () =>
          import('../views/home/interviewArrangement/interviewArrangement.vue')
      }
      // {
      //   path: '',
      //   component: () => import(''),
      // },
      // {
      //   path: '',
      //   component: () => import(''),
      // }
    ]
  }
]
const router = new VueRouter({
  routes
})
export default router
