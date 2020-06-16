import {request} from "./request";

//获取权限列表
export function getRights(type) {
  return request({
    url:`/rights/${type}`
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


//添加权限
export function setRights(roleId,rids){
  return request({
    url:`/roles/${roleId}/rights`,
    method: 'post',
    data:{rids,}
  })
}

//删除角色
export function removeRole(roleId) {
  return request({
    url:`roles/${roleId}`,
    method:'delete'
  })
}

//编辑角色
export function editRole(role){
  return request({
    url:`roles/${role.id}`,
    method:'put',
    data:{
      roleName:role.roleName,
      roleDesc:role.roleDesc
    }
  })
}

//添加角色
export function addRole(role) {
  return request({
    url:'roles',
    method:'post',
    data:role
  })
}