import axios from 'axios'

let baseURL = 'https://mmt-dev.sipcoj.com'

const $http = axios.create({
  baseURL
})

export const get = (url, params) => {
  params = params || {}
  return new Promise((resolve, reject) => {
    // axios 自带 get 和 post 方法
    $http
      .get(url, { params })
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
