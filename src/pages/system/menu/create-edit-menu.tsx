import { useImperativeHandle, useState } from 'react'
import { Modal, Form, TreeSelect, Input, InputNumber, Radio, type FormRule } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { InfoCircleOutlined } from '@ant-design/icons'

import IconSelect from '@/components/base/icon/select-icon'
import { message } from '@/utils/AntdGlobal'

import type { IAction, IModalProp } from '@/types/common'

const rules: Record<string, FormRule[]> = {
  menuName: [
    { required: true, message: '请输入菜单名称' },
    { max: 32, message: '菜单名称不能超过32个字符' }
  ],
  path: [{ max: 125, message: '路由地址不能超过125个字符' }],
  icon: [{ required: true, message: '请输入选择菜单图标' }],
  permission: [{ required: true, message: '权限标识不能为空' }]
}

const CreateEditMenu = (props: IModalProp) => {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState([])

  useImperativeHandle(props.mref, () => ({
    open
  }))

  // 打开弹出层函数
  const open = (type: IAction) => {
    setAction(type)
    setVisible(true)
    loadMenuList()
  }

  // 加载上级菜单
  const loadMenuList = async () => {
    setMenuList([])
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
    onCancel()
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
        <span style={{ marginLeft: 20 }}>{action === 'create' ? '创建菜单' : '编辑菜单'}</span>
      }
      width={830}
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
        initialValues={{ parentId: '', menuType: '0', status: '0' }}
      >
        <Form.Item hidden name='menuId'>
          <Input />
        </Form.Item>

        <Form.Item label='上级菜单' name='parentId'>
          <TreeSelect
            placeholder='请选择父级菜单'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'menuName', value: 'menuId' }}
            treeData={menuList}
            labelInValue={false}
          />
        </Form.Item>

        <Form.Item label='菜单类型' name='menuType'>
          <Radio.Group>
            <Radio value={'0'}>菜单</Radio>
            <Radio value={'1'}>页面</Radio>
            <Radio value={'2'}>按钮</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='菜单名称' name='menuName' rules={rules.menuName}>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>

        <Form.Item noStyle shouldUpdate>
          {() => {
            const menuType = form.getFieldValue('menuType')
            return menuType === 1 ? (
              <>
                <Form.Item label='权限标识' name='permission' rules={rules.permission}>
                  <Input placeholder='请输入权限标识' />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item label='组件路径' name='component'>
                  <Input placeholder='请输入组件路径' />
                </Form.Item>
                <Form.Item required label='路由地址' name='path' rules={rules.path}>
                  <Input placeholder='请输入路由地址' />
                </Form.Item>
                {form.getFieldValue('menuType') === 0 && (
                  <Form.Item required label='菜单图标' name='icon' rules={rules.icon}>
                    <IconSelect />
                  </Form.Item>
                )}
              </>
            )
          }}
        </Form.Item>

        <Form.Item
          label='排序'
          name='orderNum'
          tooltip={{ title: '排序值越大越靠后', icon: <InfoCircleOutlined rev={undefined} /> }}
        >
          <InputNumber style={{ width: 160 }} placeholder='请输入排序值' />
        </Form.Item>

        <Form.Item label='菜单状态' name='status'>
          <Radio.Group>
            <Radio value={'0'}>启用</Radio>
            <Radio value={'1'}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateEditMenu
