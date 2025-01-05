import { ReactNode, useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'

const BreadcrumbFC = () => {
  const [breadList, setBreadList] = useState<(string | ReactNode)[]>([])
  const { pathname } = useLocation()

  useEffect(() => {
    setBreadList([<a href='/welcome'>首页</a>])
  }, [pathname])
  return <Breadcrumb items={breadList.map(item => ({ title: item }))} style={{ marginLeft: 10 }} />
}

export default BreadcrumbFC
