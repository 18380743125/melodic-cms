import request from '@/api/index'

/**
 * 新增用户
 */
export function addUserApi(data: Record<string, any>) {
  return request.post({ url: '/auth/user/add', data })
}

/**
 * 更新用户
 */
export function updateUserApi(data: Record<string, any>) {
  return request.put({ url: '/auth/user/update', data })
}

/**
 * 删除用户
 */
export function deleteUserApi(data: Record<string, any>) {
  return request.delete({ url: '/auth/user/delete', data })
}

/**
 * 获取用户列表
 */
export function getUserListApi(data: Record<string, any>) {
  return request.get({ url: '/auth/user/query', data })
}
