import { AxiosResponse } from 'axios'

import CoRequest from './request'

// 下载文件
const download = (res: AxiosResponse, customName?: string) => {
  const filename =
    res.headers['content-disposition']?.replace(/\w+;filename=(.*)/, '$1') || customName
  const dom = document.createElement('a')
  const url = window.URL.createObjectURL(res.data)
  dom.href = url
  dom.download = decodeURIComponent(filename)
  dom.style.display = 'none'
  document.body.appendChild(dom)
  dom.click()
  dom.parentNode?.removeChild(dom)
  window.URL.revokeObjectURL(url)
}

const coRequest = new CoRequest({
  timeout: 10000,
  baseURL: '/api',
  interceptors: {
    requestSuccessFn(config) {
      return config
    },
    requestFailFn(err) {
      return Promise.reject(err)
    },
    responseSuccessFn(res: any) {
      // 文件流
      if (res.data instanceof Blob) {
        const { options } = res.config
        download(res, options?.downloadFilename)
        return
      }
      return Promise.resolve(res.data) as any
    },
    responseFailFn(err) {
      return Promise.reject(err)
    }
  }
})

export default coRequest
