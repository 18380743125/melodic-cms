import React, { CSSProperties, memo } from 'react'
import { Form, Space, Button } from 'antd'
import type { FormInstance } from 'antd/es/form/hooks/useForm'

import debounce from '@/utils/debounce'

import styles from './styles.module.scss'

interface IProps {
  style?: CSSProperties
  form: FormInstance
  initialValues?: Record<string, any>
  children?: string | React.ReactNode
  submit: () => void
  reset: () => void
}

/**
 * 搜索表单容器组件封装
 */
const SearchForm = (props: IProps) => {
  const submitDebounce = debounce(props.submit, { delay: 500 })
  const resetDebounce = debounce(props.reset, { delay: 500 })

  return (
    <section style={props.style}>
      <Form
        className={styles.searchForm}
        form={props.form}
        layout='inline'
        initialValues={props.initialValues}
      >
        {props.children}
        <Form.Item>
          <Space>
            <Button htmlType='submit' type='primary' onClick={submitDebounce}>
              搜索
            </Button>
            <Button htmlType='reset' type='default' onClick={resetDebounce}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </section>
  )
}

export default memo(SearchForm)
