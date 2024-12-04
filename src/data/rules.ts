import { FormRule } from 'antd'

export const loginRules: Record<string, FormRule[]> = {
  username: [{ required: true, message: '用户名不能为空' }],
  password: [{ required: true, message: '密码不能为空' }],
  code: [{ required: true, message: '验证码不能为空' }]
}
