import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router/index'
let baseURL = ''

const $http = axios.create({
  baseURL,
  withCredentails: true
})
// 请求拦截器
$http.interceptors.request.use((req) => {
  return req
})
// 响应拦截器
$http.interceptors.response.use((res) => {
  if (
    res.config.url.indexOf('login') === -1 &&
    res.config.url.indexOf('register') === -1
  ) {
    if (document.cookie === null || document.cookie === '') {
      Message.error('账号异地登录,将在3s后跳转回登录!')
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  }
  return res
})

export const get = (url, params) => {
  params = params || {}
  return new Promise((resolve, reject) => {
    // axios 自带 get 和 post 方法
    $http
      .get(url, {
        params
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const post = (url, data) => {
  data = data || {}
  return new Promise((resolve, reject) => {
    $http
      .post(url, data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
