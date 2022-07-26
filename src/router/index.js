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
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/superAdmin',
    component: () => import('../views/superAdmin/superAdmin.vue'),
    children: [
      {
        path: '/process',
        component: () =>
          import('../views/superAdmin/interviewProcess/main.vue'),
        children: [
          {
            path: '/',
            redirect: '/signup'
          },
          {
            path: '/signup',
            component: () =>
              import(
                '../views/superAdmin/interviewProcess/signupOrInterview/signup.vue'
              )
          },
          {
            path: '/interview1',
            component: () =>
              import(
                '../views/superAdmin/interviewProcess/signupOrInterview/interview1.vue'
              )
          },
          {
            path: '/interview2',
            component: () =>
              import(
                '../views/superAdmin/interviewProcess/signupOrInterview/interview2.vue'
              )
          },
          {
            path: '/interview3',
            component: () =>
              import(
                '../views/superAdmin/interviewProcess/signupOrInterview/interview3.vue'
              )
          },
          {
            path: '/interview4',
            component: () =>
              import(
                '../views/superAdmin/interviewProcess/signupOrInterview/interview4.vue'
              )
          }
        ]
      },
      //东睿的宣传信息路由
      {
        path: '/informationSet',
        component: () =>
        import('../views/superAdmin/informationSet/informationSetMain.vue'),
        children:[
          {
            path:'/basicInformation',
            component:()=>import('../views/superAdmin/informationSet/informationSetInner/informationBasic.vue'),
            children:[
              {
                path:'/informationBasicSaved',
                comments:()=>import('../views/superAdmin/informationSet/informationSetInner/informationBasicSaved.vue')
              },
              {
                path:'/informationBasicEdit',
                comments:()=>import('../views/superAdmin/informationSet/informationSetInner/informationBasicEdit.vue')
              },
            ]
          },
          {
            path:'/association',
            component:()=>import('../views/superAdmin/informationSet/informationSetInner/association.vue')
          },
          {
            path:'/recruiting',
            component:()=>import('../views/superAdmin/informationSet/informationSetInner/recruiting.vue')
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
