/**
 * 分页参数
 */
export interface PageParams {
  pageNo: number
  pageSize: number
}

/**
 * 接口公共字段
 */
export interface CommonFields {
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

/**
 * 用户登录
 */
export namespace Login {
  // 登录参数
  export interface Params {
    username: string
    password: string
    code: string
  }

  // 验证码
  export interface Captcha {
    image: string
    uuid: string
  }
}
