import axios from 'axios'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: 'http://www.jiuhaoyong.com',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
  },
  timeout: 15000,
})
http.interceptors.request.use(
  (config) => {
    let newConfig = config
    return newConfig
  },
  (error) => {
    Toast.fail('操作失败')
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  (response) => {
    let res = response
    return res
  },
  (error) => {
    Toast.fail('操作失败')
    return Promise.reject(error)
  }
)

export default http
