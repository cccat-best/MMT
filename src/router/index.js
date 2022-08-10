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
    path: '/personalInfo',
    component: () => import('../views/personalInfo/personalInfo.vue')
  },
  {
    path: '/home',
    component: () => import('../views/home/home.vue'),
    children: [
      {
        //实时面试
        path: 'onInterviewing',
        component: () =>
          import('../views/home/onInterviewing/onInterviewing.vue')
      },
      {
        // 数据看板
        path: 'dataBoard',
        component: () => import('../views/home/dataBoard/main.vue')
      },
      {
        path: 'arrangement',
        component: () =>
          import('../views/home/interviewArrangement/interviewArrangement.vue')
      },
      {
        path: 'reply',
        component: () =>
          import('../views/home/interviewReply/interviewReply.vue')
      },
      {
        path: 'resultInform',
        component: () => import('../views/home/interviewReply/resultInform.vue')
      },

      {
        path: 'interviewMain',
        component: () => import('../views/home/interviewMain/interviewMain.vue')
      },
      {
        path: 'dataBoard',
        component: () => import('../views/home/dataBoard/main.vue')
      }
    ]
  },
  {
    path: '/superAdmin',
    component: () => import('../views/superAdmin/superAdmin.vue'),
    children: [
      {
        //面试流程页面
        path: 'process',
        component: () => import('../views/superAdmin/interviewProcess/main.vue')
      },
      //东睿的宣传信息路由
      {
        path: 'informationSet',
        component: () =>
          import('../views/superAdmin/informationSet/informationSetMain.vue'),
        children: [
          {
            path: 'informationSetEdit',
            component: () =>
              import(
                '../views/superAdmin/informationSet/informationSetInner/informationBasicEdit.vue'
              )
          },
          {
            path: 'informationSetSaved',
            component: () =>
              import(
                '../views/superAdmin/informationSet/informationSetInner/informationBasicSaved.vue'
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
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}
export default router
// 路由守卫
//添加路由守卫:：通过判断来决定当前的路由跳转到底能不能进行，这种守卫，只要进行路由的跳转就会自动的触发，不能人为调用
router.beforeEach((to, from, next) => {
  // 判断当前用户是否登陆，如果登陆了则可以跳转，否则重定向到登陆页
  // 获取用户登陆之后的cookie，进行cookie的判断
  if (to.path === '/login' || to.path === '/register') {
    return next()
  }
  let cookies = document.cookie
  if (!cookies) {
    return next('/login')
  }
  next()
})
