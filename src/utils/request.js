import axios from 'axios'
import store from '@/store'
import { Toast, Dialog } from 'vant'
// import { api } from '@/config'
// create an axios instance

console.log(process.env)
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
Toast.setDefaultOptions({ duration: 5000 })
Dialog.setDefaultOptions({ 'closeOnPopstate': true })
// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = ''
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      // 登录超时,重新登录
      if (res.code === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
      Toast(res.msg || '出错了!')
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast('请求异常!')
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
