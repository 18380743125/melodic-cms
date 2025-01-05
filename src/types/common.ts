import { MutableRefObject } from 'react'

/**
 * 分页参数
 */
export interface PageParams {
  pageNo: number
  pageSize: number
}

/**
 * 接口响应公共字段
 */
export interface CommonResponseFields {
  createTime?: string
  updateTime?: string
  createBy?: string
  updateBy?: string
  isDeleted?: number
}

/**
 * 公共查询字段
 */
export interface CommonQueryFields {
  startTime?: Date
  endTime?: Date
}

/**
 * 响应类型
 */
export namespace Result {
  // 基础响应实体
  export interface Base<T = any> {
    code: number
    message?: string
    data?: T
  }

  // 分页响应实体
  export interface Page<T = any> {
    currentPage: number
    totalPages: number
    pageSize: number
    totalCount: number
    data: T[]
  }
}

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalProp {
  mref: MutableRefObject<
    { open: (action: IAction, payload?: Record<string, any>) => void } | undefined
  >
  update: () => void
}

export interface IDetailProp {
  mref: MutableRefObject<{ open: (id: string, payload?: Record<string, any>) => void } | undefined>
}
