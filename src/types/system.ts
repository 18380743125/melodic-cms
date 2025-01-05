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
