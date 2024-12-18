import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'

import AntdGlobal from './utils/AntdGlobal'
import AppRouterFC from './router'

function AppFC() {
  const theme = {
    token: {
      colorPrimary: '#4096ff'
    },
    components: {
      Menu: {
        itemHoverBg: '#d0e5f8',
        itemHoverColor: '#0387ff',
        itemBg: '#e7f0f7',
        subMenuItemBg: '#e7f0f7',
        itemSelectedBg: '#d0e5f8',
        itemColor: '#65728e',
        itemSelectedColor: '#0387ff'
      }
    }
  }
  return (
    <ConfigProvider theme={theme}>
      <AntdGlobal />

      {/* 路由 */}
      <BrowserRouter>
        <AppRouterFC />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default AppFC
