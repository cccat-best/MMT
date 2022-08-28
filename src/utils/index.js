import axios from 'axios'
import Router from '../router/index'

let baseURL = ''

const $http = axios.create({
  baseURL,
  withCredentails: true
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
        if (res.data.code == 'A0400'||res.data.code == '10003') {
          Router.push('/login')
          // console.log(res)
        } else {
          resolve(res)
        }
      })
      .catch((err) => {
        if (err.data.code == 'A0400'||err.data.code == '10003') {
          Router.push('/login')
        } else {
          reject(err)
        }
      })
  })
}

export const post = (url, data) => {
  data = data || {}
  return new Promise((resolve, reject) => {
    $http
      .post(url, data)
      .then((res) => {
        if (res.data.code == 'A0400'||res.data.code == '10003') {
          Router.push('/login')
        } else {
          resolve(res)
        }
      })
      .catch((err) => {
        if (err.data.code == 'A0400'||err.data.code == '10003') {
          Router.push('/login')
        } else {
          reject(err)
        }
      })
  })
}
