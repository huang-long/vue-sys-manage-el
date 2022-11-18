import axios from 'axios'
import { ElMessage } from 'element-plus';

// 创建 axios 实例
const service = axios.create({
  baseURL: '/sys-api',// api base_url
  timeout: 20000 // 请求超时时间
})

const err = (error: any) => {
  if (error.response) {
    switch (error?.response?.status) {
      case 403:
        ElMessage.error('403');
        break
      case 500:
        ElMessage.error('403');
        break
      case 404:
        ElMessage.error('404');
        break
      case 504:
        ElMessage.error('504');
        break
      case 401:
        ElMessage.error('401');
        break
      default:
        ElMessage.error('系统错误');
        break
    }
  } else if (error?.message) {
    ElMessage.error(error.message);
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {  
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  return config
}, (error) => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

export {
  service as axios
}
