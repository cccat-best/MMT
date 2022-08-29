import axios from 'axios'

let baseURL = ''

const $http = axios.create({
  baseURL,
  withCredentails: true
})

$http.interceptors.request.use((req) => {
  if (req.url.indexOf('login') === -1 && req.url.indexOf('register') === -1) {
    console.log('我是登录请求,我被调用了')
  }
  return req
})

$http.interceptors.response.use((res) => {
  if (
    res.config.url.indexOf('login') === -1 &&
    res.config.url.indexOf('register') === -1
  ) {
    console.log('我是响应请求,我被调用了')
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
