import request from '@/api/index'

/**
 * 新增角色
 */
export function addRoleApi(data: Record<string, any>) {
  return request.post({ url: '/auth/role/add', data })
}

/**
 * 更新角色
 */
export function updateRoleApi(data: Record<string, any>) {
  return request.put({ url: '/auth/role/update', data })
}

/**
 * 删除角色
 */
export function deleteRoleApi(data: Record<string, any>) {
  return request.delete({ url: '/auth/role/delete', data })
}

/**
 * 获取角色列表
 */
export function getRoleListApi(data: Record<string, any>) {
  return request.get({ url: '/auth/role/query', data })
}
