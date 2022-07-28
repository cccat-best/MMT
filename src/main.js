import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerElement from './global/register-element'
import './global/global.less'
import './global/iconfont.css'
import axios from 'axios'

Vue.prototype.$axios = axios

// 注册vue-clipboard2插件，并全局使用
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// 全局过滤,手机号脱敏处理
Vue.filter('replacestar', function (value) {
  if (!value) return ''
  let str = value
  str = str.toString().replace(/(\d{3})\d*(\d{4})/, '$1****$2')
  return str
})
Vue.config.productionTip = false
;('./global/register-element')

// 注册Element
Vue.use(registerElement)

import {} from 'element-ui'




Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  }
}).$mount('#app')

import { get, post } from './utils/index'
Vue.prototype.$http = {
  get,
  post
}
