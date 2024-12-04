import Login from '@/pages/login'
import { Navigate, RouteObject } from 'react-router-dom'

import Error403 from '@/pages/403'
import Error404 from '@/pages/404'

const staticRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/403',
    element: <Error403 />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

export default staticRoutes
