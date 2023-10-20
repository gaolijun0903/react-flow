import { message } from 'antd'
import axios from 'axios'

const service = axios.create({
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

service.interceptors.request.use(
  (config) => {
    // if your request body is form data
    // if (config?.method?.toLocaleUpperCase() === 'POST') {
    //   if (config.headers) {
    //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    //   }
    //   config.data = JSON.stringify(config.data)
    // }
    if (config?.headers) {
      //@ts-ignore
      config.headers['sso-origin'] = 'up' // 请求头增加单点登录源
    }
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if ((res.status && res.status != 200) || (res.code && res.code !== 0)) {
      message.error(res?.message ?? '系统异常~')
      return Promise.reject(res)
    }
    return res
  },
  (error) => {
    console.error(error.request)
    if (error.response?.status === 401) {
      const { headers } = error.response
      const { location } = headers
      if (location && location.indexOf('/oidc/authorize') > 0) {
        window.location.href = location
        return
      }
      window.location.href = `${import.meta.env.VITE_APP_LOGIN_PATH}?ReturnUrl=${encodeURIComponent(
        window.location.href,
      )}`
    }
    return Promise.reject(error)
  },
)

export default service
