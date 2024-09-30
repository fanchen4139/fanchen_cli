import {message} from "antd";

/**
 * 成功状态
 * @type {string}
 */
export const CODE_SUCCESS: string = '0000'
/**
 * 无效Token
 * @type {string}
 */
export const CODE_TOKEN_FAIL: string = '2001'
/**
 * 无效用户
 * @type {string}
 */
export const CODE_USER_FAIL: string = '2002'

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number, errorMessage?: string) => {
  const [messageApi] = message.useMessage()
  switch (status) {
    case 400:
      messageApi.error(errorMessage || '请求失败！请您稍后重试')
      break
    case 401:
      messageApi.error(errorMessage || '登录失效！请您重新登录')
      break
    case 403:
      messageApi.error(errorMessage || '当前账号无权限访问！')
      break
    case 404:
      messageApi.error(errorMessage || '你所访问的资源不存在！')
      break
    case 405:
      messageApi.error(errorMessage || '请求方式错误！请您稍后重试')
      break
    case 408:
      messageApi.error(errorMessage || '请求超时！请您稍后重试')
      break
    case 422:
      messageApi.error(errorMessage || '请求参数异常！')
      break
    case 500:
      messageApi.error(errorMessage || '服务异常！')
      break
    case 502:
      messageApi.error(errorMessage || '网关错误！')
      break
    case 503:
      messageApi.error(errorMessage || '服务不可用！')
      break
    case 504:
      messageApi.error(errorMessage || '网关超时！')
      break
    default:
      messageApi.error(errorMessage || '请求失败！')
  }
}
