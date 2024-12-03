/**
 * 分页参数
 */
export interface PageParams {
  currentPage: number
  pageSize: number
}

/**
 * 创建和更新时间
 */
export interface CreateUpdateTime {
  createTime: string
  updateTime: string
}

/**
 * 创建人和更新人
 */
export interface CreateUpdateBy {
  createBy: string
  updateBy: string
}

/**
 * 开始和结束时间
 */
export interface StartEndTime {
  startTime: Date
  endTime: Date
}

/**
 * 响应类型
 */
export namespace Result {
  // 基础响应实体
  export interface BaseResult<T = any> {
    code: number
    message?: string
    data?: T
  }

  // 分页响应实体
  export interface PageResult<T = any> {
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
    uuid?: string
  }

  // 验证码
  export interface Captcha {
    image: string
    uuid: string
  }

  // token
  export type Token = string
}

/**
 * 微信用户
 */
export namespace WechatUser {
  export interface UserItem extends CreateUpdateTime {
    userId: string
    realName: string
    username: string
    openId: string
    unionId: string
    phoneNumber: string
    avatarUrl: string
    status: string
    loginIp: string
    loginDate: string
    delFlag: string
    idCard: string
    email: string
    teamName: string
    teamRole: string
    hobbies: string
    province: string
    city: string
    country: string
    height: string
    weight: string
    introduction: string
    birthDate: string
  }

  export interface QueryParams extends PageParams {
    realName: string
    username: string
    email: string
    phoneNumber: string

    [key: string]: any
  }
}
