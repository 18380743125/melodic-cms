import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

import staticRoutes from './static.routes'
import ErrorBoundary from './error-boundary'

import AppLayoutFC from '@/layout'
import WelcomeFC from '@/pages/welcome'
import MenuFC from '@/pages/system/menu'

const useAppRouter = () => {
  const routes: RouteObject[] = [
    ...staticRoutes,
    {
      path: '/',
      errorElement: <ErrorBoundary />,
      element: <AppLayoutFC />,
      children: [
        {
          path: '/welcome',
          element: <WelcomeFC />
        },
        {
          path: '/system/menu',
          element: <MenuFC />
        }
      ]
    }
  ]
  const router = createBrowserRouter(routes)
  return router
}

export default useAppRouter
