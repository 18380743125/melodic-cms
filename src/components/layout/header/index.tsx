import { Dropdown, MenuProps } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import BreadcrumbFC from './breadcrumb'

import styles from './styles.module.scss'

interface IProps {
  leftContent?: React.ReactNode
}

const NavHeader = (props: IProps) => {
  const collapsed = false

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: <span style={{ fontSize: 13 }}>个人资料</span>
    },
    {
      key: 'update-password',
      label: <span style={{ fontSize: 13 }}>修改密码</span>
    },
    {
      key: 'logout',
      label: <span style={{ fontSize: 13 }}>注销登录</span>
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'profile':
        // TODO 我的资料
        break
      case 'update-avatar':
        // TODO 更换头像
        break
      case 'update-password':
        // TODO 修改密码
        break
      case 'logout':
        // TODO 注销登录
        break
    }
  }

  return (
    <section className={styles.headerLayout}>
      <div className={styles.left}>
        {props.leftContent ? (
          props.leftContent
        ) : (
          <>
            <div className={styles.foldIcon}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <BreadcrumbFC />
          </>
        )}
      </div>
      <div className={styles.right}>
        <Dropdown
          placement='bottom'
          arrow={{ pointAtCenter: true }}
          menu={{ items, onClick }}
          trigger={['click']}
        >
          <div className={styles.userInfo}>
            <img className={styles.img} alt='头像' />
            <span className={styles.realName}>管理员</span>
          </div>
        </Dropdown>
      </div>
    </section>
  )
}

export default NavHeader
