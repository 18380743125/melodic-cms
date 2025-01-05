import { ReactNode } from 'react'
import { Button, ButtonProps } from 'antd'

interface IProps extends ButtonProps {
  auth?: string
  children: ReactNode
}

const AuthButton = (props: IProps) => {
  // 角色标识列表
  // const roleKeys = []

  // 权限标识
  // const permissions = [] as string[]

  // 不需要授权 或者 超级管理员

  return <Button {...props}>{props.children}</Button>

  // if (permissions.includes(props.auth!)) {
  //   return <Button {...props}>{props.children}</Button>
  // }

  // return <></>
}

export default AuthButton
