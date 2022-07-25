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
    path: '/superAdmin',
    component: () => import('../views/home/superAdmin.vue'),
    children: [
      {
        path: 'accountManage',
        component: () => import('../views/home/accountManage/main.vue')
      }
    ]
  },
  {
    path: '/home',
    component: () => import('../views/home/home.vue'),
    children: [
      {
        path: '/process',
        component: () => import('../views/home/interviewProcess/main.vue'),
        children: [
          {
            path: '/',
            redirect: '/signup'
          },
          {
            path: '/signup',
            component: () =>
              import(
                '../views/home/interviewProcess/signupOrInterview/signup.vue'
              )
          },
          {
            path: '/interview1',
            component: () =>
              import(
                '../views/home/interviewProcess/signupOrInterview/interview1.vue'
              )
          },
          {
            path: '/interview2',
            component: () =>
              import(
                '../views/home/interviewProcess/signupOrInterview/interview2.vue'
              )
          },
          {
            path: '/interview3',
            component: () =>
              import(
                '../views/home/interviewProcess/signupOrInterview/interview3.vue'
              )
          },
          {
            path: '/interview4',
            component: () =>
              import(
                '../views/home/interviewProcess/signupOrInterview/interview4.vue'
              )
          }
        ]
      }
    ]
  }
]
const router = new VueRouter({
  routes
})
export default router
