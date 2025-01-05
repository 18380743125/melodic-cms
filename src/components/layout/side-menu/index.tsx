import { Menu } from 'antd'
import styles from './styles.module.scss'

interface IProps {}

const SideMenu = (_props: IProps) => {
  const collapsed = false
  const selectedKeys = []
  const menuList = [
    {
      key: '1',
      label: '菜单1'
    },
    {
      key: '2',
      label: '菜单2'
    },
    {
      key: '3',
      label: '菜单3'
    }
  ]
  const handleClickMenu = (e: any) => {
    console.log(e)
  }

  return (
    <section className={styles.sideMenu}>
      <h5 className={styles.title}>小朗畅听</h5>
      <Menu
        mode='inline'
        className={styles.menu}
        style={{
          width: collapsed ? 80 : 'auto'
        }}
        selectedKeys={selectedKeys}
        onClick={handleClickMenu}
        items={menuList}
      />
    </section>
  )
}

export default SideMenu
