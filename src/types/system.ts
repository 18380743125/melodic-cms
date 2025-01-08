import type { CommonResponseFields } from './common'

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

export namespace Permission {
  export interface Item extends CommonResponseFields {
    id: number
    name: string
    parentId: number
    type: number
    path: string
    url: string
    status: string
    icon: string
    sortNum: string
    permissionKey: string
  }
}
