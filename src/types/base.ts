export interface PageInterface<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: string
  total: number
}

export interface BaseResponse<T> {
  data: T
  err_code: number
  msg: string
}
