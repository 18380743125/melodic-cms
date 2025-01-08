import request from '@/api/index'

/**
 * 新增权限
 */
export function addPermissionApi(data: Record<string, any>) {
  return request.post({ url: '/auth/permission/add', data })
}

/**
 * 更新权限
 */
export function updatePermissionApi(data: Record<string, any>) {
  return request.put({ url: '/auth/permission/update', data })
}

/**
 * 删除权限
 */
export function deletePermissionApi(data: Record<string, any>) {
  return request.delete({ url: '/auth/permission/delete', data })
}

/**
 * 获取权限列表
 */
export function getPermissionListApi(data: Record<string, any>) {
  return request.get({ url: '/auth/permission/query', data })
}
