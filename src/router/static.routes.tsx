import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import LazyImportComponent from './lazy-import-component'

const staticRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/login'))} />
  },
  {
    path: '/403',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/403'))} />
  },
  {
    path: '/404',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/404'))} />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

export default staticRoutes
