import axios from 'axios'

axios.interceptors.request.use((req) => {
  console.log('我被调用啦')
  console.log(req)
})

axios.interceptors.response.use((res) => {
  console.log(res)
})
