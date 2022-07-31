import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import personalInfo from '../views/home/personalInfo/personalInfo.vue'
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
  // {
  //   path: '/superAdmin',
  //   component: () => import('../views/home/superAdmin.vue'),
  //   children: [
  //     {
  //       path: 'accountManage',
  //       component: () => import('../views/home/accountManage/main.vue')
  //     }
  //   ]
  // },

  {
    path: '/home',
    component: () => import('../views/home/home.vue'),
    children: [
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
      // {
      //   path: 'personalInfo',
      //   component: () =>
      //     import('../views/home/personalIofo/personalIofo.vue')
      // },
      {
        path: 'personalInfo',
        component: personalInfo
      },
      {
        path:'interviewMain',
        component:()=>import('../views/home/interviewMain/interviewMain.vue')
      }
    ]
  },

  {
    path: '/superAdmin',
    component: () => import('../views/superAdmin/superAdmin.vue'),
    children: [
      {        //面试流程页面
        path: 'process',
        component: () => import('../views/superAdmin/interviewProcess/main.vue')
      },
      //东睿的宣传信息路由
      {
        path: 'informationSet',
        component: () =>
        import('../views/superAdmin/informationSet/informationSetMain.vue'),
        children:[
          {
            path:'basicInformation',
            component:()=>import('../views/superAdmin/informationSet/informationSetInner/informationBasic.vue'),
            children:[
              {
                path:'informationBasicSaved',
                comments:()=>import('../views/superAdmin/informationSet/informationSetInner/informationBasicSaved.vue')
              },
              {
                path:'informationBasicEdit',
                comments:()=>import('../views/superAdmin/informationSet/informationSetInner/informationBasicEdit.vue')
              },
            ]
          },
          {
            path:'association',
            component:()=>import('../views/superAdmin/informationSet/informationSetInner/association.vue')
          },
          {
            path:'recruiting',
            component:()=>import('../views/superAdmin/informationSet/informationSetInner/recruiting.vue')
          }
        ],
      }
    ]
  }
]
const router = new VueRouter({
  routes
})
export default router
