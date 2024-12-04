import { Button, Col, Form, Input, Row } from 'antd'

import { loginRules } from '@/data/rules'
import styles from './styles.module.scss'

const LoginFC = () => {
  return (
    <main className={styles.root}>
      <div className={styles.login}>
        <div className={styles.title}>系统登录</div>
        <Form initialValues={{ username: '', password: '' }} autoComplete='off' labelAlign='left'>
          {/* 用户名 */}
          <Form.Item
            label='用户名'
            labelCol={{ span: '4' }}
            required
            name='username'
            rules={loginRules.username}
          >
            <Input autoFocus />
          </Form.Item>

          {/* 密码 */}
          <Form.Item
            label='密码'
            labelCol={{ span: '4' }}
            required
            name='password'
            rules={loginRules.password}
          >
            <Input.Password autoComplete='off' />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            label='验证码'
            labelCol={{ span: '4' }}
            required
            name='code'
            rules={loginRules.code}
          >
            <Row>
              <Col span={11}>
                <Input />
              </Col>
              <Col span={13} className={styles.code}></Col>
            </Row>
          </Form.Item>

          {/* 登录按钮 */}
          <div className={styles.loginBtn}>
            <Button type='primary' block htmlType='submit'>
              登录
            </Button>
          </div>
        </Form>
      </div>
    </main>
  )
}

export default LoginFC
