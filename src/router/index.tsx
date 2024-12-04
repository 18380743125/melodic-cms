import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'

import staticRoutes from './static.routes'
import AppLayoutFC from '@/layout'
import WelcomeFC from '@/pages/welcome'

const AppRouterFC = () => {
  const routes: RouteObject[] = [
    {
      element: <AppLayoutFC />,
      children: [
        {
          path: '/welcome',
          element: <WelcomeFC />
        }
      ]
    },
    ...staticRoutes
  ]
  return useRoutes(routes)
}

export default AppRouterFC
