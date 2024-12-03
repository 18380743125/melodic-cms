import { ReactNode } from 'react'
import { Button, ButtonProps } from 'antd'

interface IProps extends ButtonProps {
    auth?: string
    children: ReactNode
}

const AuthButton = (props: IProps) => {

    return <></>
}

export default AuthButton
