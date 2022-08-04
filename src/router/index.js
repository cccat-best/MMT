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
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/superAdmin',
    component: () => import('../views/superAdmin/superAdmin.vue'),
    children: [
      {
        //面试流程页面
        path: 'process',
        component: () => import('../views/superAdmin/interviewProcess/main.vue')
      }
    ]
  }
]
const router = new VueRouter({
  routes
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}
export default router
