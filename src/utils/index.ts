import { nanoid } from 'nanoid'
import sparkMD5 from 'spark-md5'
import DOMPurify from 'dompurify'

/**
 * 将 blob 转 base64
 * @param file 文件
 */
export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

/**
 * base64 转换成文件对象
 * @param base64
 * @param filename
 */
export const base642File = (base64: string, filename: string) => {
  // 将 base64 的数据部分提取出来
  const parts = base64.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])

  // 将原始数据转换为 Uint8Array
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  // 使用 Uint8Array 创建 Blob，然后使用 Blob 创建 File
  const blob = new Blob([uInt8Array], { type: contentType })
  return new File([blob], filename, { type: contentType })
}

/**
 * 检查图片格式 大小
 * @param file 文件
 */
export const checkImageFormat = (file: File, options: Record<string, any> = {}) => {
  const types = options.types || ['image/jpeg', 'image/jpg', 'image/png']
  const k = options.k || 10
  const typeFlag = types.includes(file.type)
  const isLtKMB = file.size / 1024 / 1024 < k
  return typeFlag && isLtKMB
}

/**
 * 生成文件唯一标识
 * @param file 文件
 */
export function generateFileIdentifier(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const blobSlice = File.prototype.slice
    const chunkSize = 1024 * 1024 * 2
    const chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    const spark = new sparkMD5.ArrayBuffer()
    const fileReader = new FileReader()

    fileReader.onload = function (e) {
      spark.append(e.target?.result as any)
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        resolve(spark.end())
      }
    }

    fileReader.onerror = function () {
      reject('文件唯一标识生成失败')
    }

    function loadNext() {
      const start = currentChunk * chunkSize
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }

    loadNext()
  })
}

/**
 * 获取 uuid
 */
export function getUUID() {
  return nanoid()
}

/**
 * 递归对树排序：按照 orderNum 属性
 * @param tree 树型数组
 * @param way 排序方式，默认升序
 */
export function treeArraySort(tree: any[], way: 'ASC' | 'DESC' = 'ASC'): void {
  if (way === 'ASC') {
    tree.sort((a, b) => a.orderNum - b.orderNum)
  } else if (way === 'DESC') {
    tree.sort((a, b) => b.orderNum - a.orderNum)
  }
  for (const node of tree) {
    if (node.children && node.children.length > 0) {
      treeArraySort(node.children, way)
    }
  }
}

/**
 * 在树型数组中查找符合条件的项
 */
export function getTreeItemByCondition(tree: any[], key: string, value: string): any {
  for (const item of tree) {
    if (item[key] === value) {
      return item
    }
    if (item.children && item.children.length > 0) {
      const result = getTreeItemByCondition(item.children, key, value)
      if (result) {
        return result
      }
    }
  }
  return null
}

/**
 * 递归查找菜单路径（面包屑）
 */
export const findTreeNodePath = (
  tree: any[],
  key: string,
  value: string,
  path: string[]
): string[] => {
  if (!tree) return []
  for (const data of tree) {
    path.push(data.menuName)
    if (data[key] === value) return path
    if (data.children?.length) {
      const list = findTreeNodePath(data.children, key, value, path)
      if (list?.length) return list
    }
    path.pop()
  }
  return []
}

/**
 * 对象数组去重
 * @param arr 数组
 * @param key 按照 key 去重
 */
export function removeObjArrayDuplicates(arr: any[], key: string) {
  const map = new Map()
  return arr.filter(item => {
    const value = item[key]
    if (!map.has(value)) {
      map.set(value, true)
      return true
    }
    return false
  })
}

/**
 * 获取值的类型
 * @param value
 */
export const getValueType = (value: unknown) => {
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  } as any
  return map[Object.prototype.toString.call(value)]
}

/**
 * value 是否是对象
 * @param value
 */
export function isObject(value: unknown) {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

/**
 * 自动柯里化函数
 * @param fn 函数参数不支持剩余参数
 */
export function currying(fn: (...args: any[]) => any) {
  return function curryingFn(...args: any[]) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...newArgs: any[]) {
        return curryingFn.apply(this, args.concat(newArgs))
      }
    }
  }
}

/**
 * 组合函数，上次函数执行的结果作为下一个函数的参数
 * @param fns
 */
export function composeFn(fns: ((...args: any[]) => any)[]) {
  if (!Array.isArray(fns) || fns.length === 0) {
    throw new Error('fns cannot be an empty array')
  }
  for (const fn of fns) {
    if (typeof fn !== 'function') {
      throw new Error('fn must be a function')
    }
  }
  return function (...rest: any[]) {
    let result = fns[0].apply(this, rest)
    for (let i = 1; i < fns.length; i++) {
      result = fns[i].call(this, result)
    }
    return result
  }
}

/**
 * 过滤 HTML 敏感字符
 * @param html
 * @param options
 */
export function filterHtmlSensitiveCharacter(html: string, options?: Record<string, any>) {
  return DOMPurify.sanitize(html, options || {})
}
