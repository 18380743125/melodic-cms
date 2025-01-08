import { useImperativeHandle, useState } from 'react'
import { Modal, Form, TreeSelect, Input, InputNumber, Radio, type FormRule } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { InfoCircleOutlined } from '@ant-design/icons'

import IconSelect from '@/components/base/icon/select-icon'
import { message } from '@/utils/AntdGlobal'

import type { IAction, IModalProp } from '@/types/common'

const rules: Record<string, FormRule[]> = {
  name: [
    { required: true, message: '请输入权限名称' },
    { max: 32, message: '权限名称不能超过32个字符' }
  ],
  permission: [{ required: true, message: '权限标识不能为空' }]
}

const CreateEditMenu = (props: IModalProp) => {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [list, setList] = useState([])

  useImperativeHandle(props.mref, () => ({
    open
  }))

  // 打开弹出层函数
  const open = (type: IAction) => {
    setAction(type)
    setVisible(true)
    loadList()
  }

  // 加载上级菜单
  const loadList = async () => {
    setList([])
  }

  // 提交
  const onOk = async () => {
    await form.validateFields()
    const values = form.getFieldsValue()
    console.log(values)

    if (action === 'create') {
      message.success('创建成功')
    } else {
      message.success('更新成功')
    }
    // onCancel()
    props.update()
  }

  // 关闭和重置弹框
  const onCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  return (
    <Modal
      style={{ top: 30 }}
      title={
        <span style={{ marginLeft: 20 }}>{action === 'create' ? '创建权限' : '编辑权限'}</span>
      }
      width={730}
      open={visible}
      okText='确定'
      cancelText='取消'
      maskClosable={false}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        style={{ marginTop: 24 }}
        form={form}
        labelAlign='right'
        labelCol={{ span: 3 }}
        initialValues={{ parentId: '', type: '0', status: '0' }}
        autoComplete={'off'}
      >
        <Form.Item hidden name='id'>
          <Input />
        </Form.Item>

        <Form.Item label='上级权限' name='parentId'>
          <TreeSelect
            placeholder='请选择父级权限'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'name', value: 'id' }}
            treeData={list}
            labelInValue={false}
          />
        </Form.Item>

        <Form.Item required label='权限名称' name='name' rules={rules.name}>
          <Input placeholder='请填写权限名称' />
        </Form.Item>

        <Form.Item label='权限类型' name='type'>
          <Radio.Group>
            <Radio value={'0'}>菜单</Radio>
            <Radio value={'1'}>操作</Radio>
            <Radio value={'2'}>页面</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item noStyle shouldUpdate>
          {() => {
            const type = form.getFieldValue('type')
            let dynamicItems = (
              <>
                <Form.Item label='路由地址' name='url'>
                  <Input placeholder='请填写路由地址' />
                </Form.Item>
                <Form.Item label='组件路径' name='path'>
                  <Input placeholder='请填写组件路径' />
                </Form.Item>
                {type === '0' && (
                  <Form.Item label='权限图标' name='icon' rules={rules.icon}>
                    <IconSelect />
                  </Form.Item>
                )}
              </>
            )
            if (type === '1') {
              dynamicItems = (
                <Form.Item label='权限标识' name='permission' rules={rules.permission}>
                  <Input placeholder='请填写权限唯一标识' />
                </Form.Item>
              )
            }
            return dynamicItems
          }}
        </Form.Item>

        <Form.Item
          label='排序'
          name='orderNum'
          tooltip={{ title: '排序值越大位置越靠后', icon: <InfoCircleOutlined /> }}
        >
          <InputNumber min={0} style={{ width: 180 }} placeholder='请输入排序值' />
        </Form.Item>

        <Form.Item label='启用状态' name='status'>
          <Radio.Group>
            <Radio value={'0'}>是</Radio>
            <Radio value={'1'}>否</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateEditMenu
