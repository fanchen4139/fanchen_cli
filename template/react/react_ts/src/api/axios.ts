import qs from "qs";
import {message} from "antd"
import axios, {AxiosInstance, AxiosResponse} from 'axios'
import {NavigateFunction, useNavigate} from "react-router-dom";


const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com', // 替换为你的 API 基础 URL
  timeout: 10000, // 超时时间
})

// 请求数据转换器
axiosInstance.defaults.transformRequest = [
  (data, headers) => {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      return qs.stringify(data)
    } else if (headers['Content-Type'] === 'application/json') {
      return JSON.stringify(data)
    } else {
      return data
    }
  }
]

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 处理状态码
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      const navigate = useNavigate()
      handleError(navigate, response)
      return Promise.reject(new Error(`Error: ${response.status}`))
    }
  },
  (error) => {
    const navigate = useNavigate()
    // 处理错误
    if (error.response) {
      handleError(navigate, error.response)
    }
    return Promise.reject(error)
  }
)

const [messageApi] = message.useMessage()

// 状态码处理函数
const handleError = (navigate: NavigateFunction, response: AxiosResponse) => {
  switch (response.status) {
    case 400:
      console.error('Bad Request: ', response.data)
      break
    case 401:
      console.error('Unauthorized: ', response.data)
      // 可在这里重定向到登录页面
      navigate('/login')
      break
    case 404:
      console.error('Not Found: ', response.data)
      break
    case 500:
      console.error('Internal Server Error: ', response.data)
      break
    default:
      console.error('Unexpected error: ', response.data)
  }
  messageApi.open({
    type: 'error',
    content: response.data.message
  })
}
export const request = axiosInstance.request
export const get = axiosInstance.get
export const getUri = axiosInstance.getUri
export const del = axiosInstance.delete
export const head = axiosInstance.head
export const options = axiosInstance.options
export const post = axiosInstance.post
export const put = axiosInstance.put
export const patch = axiosInstance.patch
export const postForm = axiosInstance.postForm
export const putForm = axiosInstance.putForm
export const patchForm = axiosInstance.patchForm

export default {
  request,
  get,
  getUri,
  del,
  head,
  options,
  post,
  put,
  patch,
  postForm,
  putForm,
  patchForm,
}
