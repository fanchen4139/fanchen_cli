// 请求响应参数（不包含data）
export interface IResult {
  code: string
  message: string
}

// 请求响应参数（包含data）
export interface IResultData<T = unknown> extends IResult {
  data: T
}

export interface IPage<T = unknown> {
  current: number
  limit: number
  totalPage: number
  total: number
  rows: T[]
  param?: { [key: string]: unknown } | string
}

export interface IPageQuery {
  page: number
  limit: number
}
