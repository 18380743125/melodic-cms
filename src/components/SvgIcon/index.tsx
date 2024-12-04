import { ButtonProps } from 'antd'
import { ReactNode } from 'react'

interface IProps extends ButtonProps {
  auth?: string
  children: ReactNode
}

const AuthButton = (props: IProps) => {
  return <></>
}

export default AuthButton
