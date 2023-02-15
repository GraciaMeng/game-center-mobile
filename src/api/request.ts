import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'

// 本地用代理，线上直接接口url
export const BASE_URL = ['development'].includes(import.meta.env.MODE) ? '/api' : import.meta.env.VITE_APP_API_URL

const service = axios.create({
  // baseURL: BASE_URL, // 设置统一的请求前缀
  timeout: 5000, // 设置统一的超时时长
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error) // 错误继续返回给到具体页面
  },
)

export enum METHOD {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}

interface CacheParams {
  url: string
  method: METHOD
  params: any
  config: AxiosRequestConfig
  promise?: Promise<any>
}

const pendingMap = new Map<string, CacheParams>()
/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config: CacheParams) {
  const { url, method, config: requestConfig } = config
  let { params } = config
  if (typeof params === 'object') {
    params = JSON.stringify(params)
  }
  let requestConfigStr = ''
  if (typeof requestConfig === 'object') {
    requestConfigStr = JSON.stringify(requestConfig)
  }
  return [url, method, params, requestConfigStr].join('&')
}

/**
 * 判断是否有请求，如果有上一次请求则使用上一次的promise，如果没有返回null
 * @param config CacheParams
 * @returns Promise<T> | null
 */
function hasRequest<T>(config: CacheParams): Promise<T> | null {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    return pendingMap.get(pendingKey)!.promise as Promise<T>
  } else {
    return null
  }
}

/**
 * 添加请求到pendingMap请求缓存区中
 * @param config CacheParams
 * @param requestInstance Promise<T>
 * @param delTime 缓存失效时间
 */
function addRequest<T>(config: CacheParams, requestInstance: Promise<T>, delTime: number) {
  const pendingKey = getPendingKey(config)
  requestInstance.finally(() => {
    setTimeout(() => {
      pendingMap.delete(pendingKey)
    }, delTime)
  })
  pendingMap.set(pendingKey, {
    ...config,
    promise: requestInstance,
  })
}

// 表单提交类型
export const FormDataContentType = 'multipart/form-data'

/**
 * 判断是否multipart/form-data请求方式，因为这种请求方式没有data和params，如果使用切片上传文件会导致重复使用上一次
 * @param config AxiosRequestConfig
 * @returns boolean
 */
function isFormDataHeaders(config: AxiosRequestConfig) {
  return config?.headers?.['Content-Type'] === FormDataContentType
}

/**
 * 统一请求方法
 * @param url 请求url
 * @param method 请求方法
 * @param data 请求参数
 * @param config 请求配置
 * @param delTime 请求缓存失效时间
 * @returns Promise<T>
 */
export function request<T = any>(
  url: string,
  method: METHOD,
  data = {},
  config: AxiosRequestConfig = {},
  delTime = 300,
): Promise<T> {
  const options = { url, method, params: data, config }
  if (!isFormDataHeaders(config)) {
    const instance = hasRequest<T>(options)
    if (instance) {
      return instance!
    }
  }
  const requestInstance = new Promise<T>((resolve, reject) => {
    service({
      ...config,
      url,
      method,
      params: method === METHOD.GET ? data : '',
      data: method !== METHOD.GET ? data : '',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
  // FormData提交方式不做处理
  // 否则都会使用上一次请求结果
  !isFormDataHeaders(config) && addRequest(options, requestInstance, delTime)
  return requestInstance
}
