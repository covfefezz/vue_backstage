import {request} from "./request";

//获取权限列表
export function getRights() {
  return request({
    url:'/rights/list'
  })
}

//获取角色列表
export function getRoles() {
  return request({
    url:'/roles'
  })
}

//移除权限
export function removeRights(roleId,rightsId) {
  return request({
    url:`/roles/${roleId}/rights/${rightsId}`,
    method:'delete'
  })
}