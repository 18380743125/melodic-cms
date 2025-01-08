import { useRef } from 'react'
import { Form, Input, Space, Table, Tag } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ColumnsType } from 'antd/es/table'
import { useAntdTable } from 'ahooks'

import AuthButton from '@/components/base/auth-button'
import SearchForm from '@/components/table/search-form'
import ActionBar from '@/components/table/action-bar'
import CreateEditMenu from './create-edit-menu'

import { message, modal } from '@/utils/AntdGlobal'

import useTableScrollHeight from '@/hooks/useTableScrollHeight'
import { formatNull } from '@/utils/format'

import type { IAction } from '@/types/common'

import styles from './styles.module.scss'

const MenuList = () => {
  const tableRef = useRef<HTMLDivElement | null>(null)
  const [tableScrollY] = useTableScrollHeight(tableRef, false)

  const [form] = useForm()

  const createEditRef = useRef<{ open: (action: IAction, payload?: Record<string, any>) => void }>()

  // 加载数据
  const getTableData = async () => {
    return {
      total: 0,
      list: []
    }
  }

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10
  })

  // 重置
  const onReset = () => {
    form.resetFields()
    search.submit()
  }

  // 创建菜单
  const onCreate = () => {
    createEditRef.current?.open('create')
  }

  // 创建子菜单
  const onCreateSub = () => {
    createEditRef.current?.open('create', {})
  }

  // 编辑菜单
  const onEdit = () => {
    createEditRef.current?.open('edit', {})
  }

  // 删除菜单
  const onDelete = (row: Record<string, any>) => {
    modal.confirm({
      title: '提示',
      cancelText: '取消',
      okText: '确定',
      closable: true,
      content: `你确定要删除【${row.menuName}】吗？`,
      async onOk() {
        message.success('删除成功')
        search.submit()
      }
    })
  }

  // 表格列数据
  const columns: ColumnsType = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
      width: '18%'
    },
    {
      title: '类型',
      dataIndex: 'menuType',
      key: 'menuType',
      align: 'center'
    },
    {
      title: '权限标识',
      dataIndex: 'permission',
      key: 'permission',
      align: 'center'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path',
      align: 'center'
    },
    {
      title: '组件路径',
      dataIndex: 'component',
      key: 'component',
      align: 'center',
      render(value: string) {
        return formatNull(value)
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render() {
        return <Tag color={'success'}>启用</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 212,
      render(_, row) {
        return (
          <Space>
            <AuthButton type='link' onClick={() => onCreateSub()}>
              新增
            </AuthButton>
            <AuthButton type='link' onClick={() => onEdit()}>
              编辑
            </AuthButton>
            <AuthButton type='link' danger onClick={() => onDelete(row)}>
              删除
            </AuthButton>
          </Space>
        )
      }
    }
  ]

  return (
    <section className={styles.root}>
      {/* 搜索栏 */}
      <SearchForm initialValues={{ status: '' }} form={form} reset={onReset} submit={search.submit}>
        <Form.Item name='menuName'>
          <Input style={{ width: 220 }} placeholder='请输入菜单名称' />
        </Form.Item>
      </SearchForm>

      {/* 操作栏 */}
      <ActionBar
        operatorRight={
          <AuthButton type='primary' onClick={onCreate}>
            新增
          </AuthButton>
        }
      />

      <section className={styles.appTable} ref={tableRef}>
        <Table
          scroll={{ y: tableScrollY, scrollToFirstRowOnChange: true }}
          rowKey='menuId'
          columns={columns}
          {...tableProps}
          pagination={false}
        />
      </section>

      {/* 创建和编辑菜单 */}
      <CreateEditMenu mref={createEditRef} update={search.submit} />
    </section>
  )
}

export default MenuList
