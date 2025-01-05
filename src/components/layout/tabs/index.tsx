import { Tabs } from 'antd'

import styles from './styles.module.scss'

interface IProps {}

const TabsFC = (_props: IProps) => {
  const tabList = [{ key: '1', label: '首页' }]
  return (
    <section className={styles.tabsLayout}>
      <Tabs
        items={tabList}
        tabBarStyle={{ height: 34, marginBottom: 0, backgroundColor: 'white' }}
        type='editable-card'
        hideAdd
      />
    </section>
  )
}

export default TabsFC
