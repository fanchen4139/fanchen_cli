import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { LOGIN_URL } from '@/config'
import { checkStatus, CODE_SUCCESS, CODE_TOKEN_FAIL, CODE_USER_FAIL } from '@/api/helper'
import type { IResultData } from '@/api/interface'
// import { useAuthStore } from '@/stores/modules/auth'
// import { useSocketStore } from '@/stores/modules/socket'
import {message} from "antd"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
// import {RootState, selectAuthStore, selectUserStore} from "../stores"
import {selectUserStore} from "../stores"
import {clear as userClear} from "@/stores/modules/user"
import {clear as authClear} from "@/stores/modules/auth"

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean
  cancel?: boolean
}

const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间
  timeout: 30000
  // 跨域时候允许携带凭证
  // withCredentials: true
}


class RequestHttp {
  service: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    // instantiation
    this.service = axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { loading: false } 来控制
        // config.loading !== false && showFullScreenLoading()
        if (config.headers && typeof config.headers.set === 'function') {
          const userStore = useSelector(selectUserStore)
          config.headers.set('Authorization', 'Bearer ' + userStore.token)
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response) => {
        const [messageApi] = message.useMessage()
        const { data } = response
        // const socketStore = useSocketStore()
        //tryHideFullScreenLoading()
        // 登陆失效
        if (data.code === CODE_TOKEN_FAIL || data.code === CODE_USER_FAIL) {
          userClear()
          authClear()
          // 关闭socket
          // socketStore.close()
          const navigate = useNavigate()

          navigate(LOGIN_URL, {replace: true})
          messageApi.error(data.message)
          return Promise.reject(data)
        }
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (data.code && data.code !== CODE_SUCCESS) {
          messageApi.error(data.message)
          return Promise.reject(data)
        }
        // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data
      },
      async (error) => {
        const [messageApi] = message.useMessage()
        const { response } = error
        // tryHideFullScreenLoading()
        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.indexOf('timeout') !== -1) {
          messageApi.error('请求超时！请您稍后重试')
        }
        if (error.message.indexOf('Network Error') !== -1) {
          messageApi.error('网络错误！请您稍后重试')
        }
        // 根据服务器响应的错误状态码，做不同的处理
        if (response) {
          checkStatus(response?.status, response?.data?.message)
        }
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) {
          const navigate = useNavigate()
          navigate('/500', {replace: true})
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params: object = {}, _object = {}): Promise<IResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }

  post<T>(url: string, params: object = {}, _object = {}): Promise<IResultData<T>> {
    return this.service.post(url, params, _object)
  }

  put<T>(url: string, params: object = {}, _object = {}): Promise<IResultData<T>> {
    return this.service.put(url, params, _object)
  }

  delete<T>(url: string, data: object = {}, _object = {}): Promise<IResultData<T>> {
    return this.service.delete(url, { data, ..._object })
  }

  download(url: string, params = {}, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' })
  }

  template(url: string, params = {}, _object = {}): Promise<BlobPart> {
    return this.service.get(url, { params, ..._object, responseType: 'blob' })
  }

  upload<T>(url: string, params = {}, _object = {}): Promise<IResultData<T>> {
    return this.service.post(url, params, {
      ..._object,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default new RequestHttp(config)
