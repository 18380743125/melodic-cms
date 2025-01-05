import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import AppSideMenu from '@/components/layout/side-menu'
import AppHeader from '@/components/layout/header'
import AppTabs from '@/components/layout/tabs'

import styles from './styles.module.scss'

const AppLayoutFC = () => {
  const collapsed = false
  return (
    <Layout className={styles.layout}>
      {/* 侧边栏 */}
      <Layout.Sider width={180} collapsed={collapsed}>
        <AppSideMenu />
      </Layout.Sider>

      <Layout>
        {/* 头部区域 */}
        <AppHeader />

        {/* 标签页区域 */}
        <AppTabs />

        {/* 主体内容区域 */}
        <main className={styles.contentLayout}>
          <section className={styles.content}>
            <Outlet />
          </section>
        </main>
      </Layout>
    </Layout>
  )
}

export default AppLayoutFC
