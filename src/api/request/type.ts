import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

interface CoRequestConfig extends InternalAxiosRequestConfig {
  showLoading?: boolean
}

export interface MyInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: CoRequestConfig) => CoRequestConfig
  requestFailFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailFn?: (err: any) => any
}

export interface MyRequestConfig<T = AxiosResponse> extends CoRequestConfig {
  interceptors?: MyInterceptors<T>
	options?: Record<string, any>
}
