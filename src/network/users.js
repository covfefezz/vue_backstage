import {request} from "./request";

//请求用户数据
export function getUsers(userParam) {
  return request({
    url:'/users',
    method:'get',
    params:userParam
  })
}

//修改用户状态
export function userStatus(userInfo) {
  return request({
    url:`/users/${userInfo.id}/state/${userInfo.mg_state}`,
    method: 'put',
  })
}

//添加用户
export function addUser(userInfo) {
  return request({
    url:'/users',
    method:'post',
    data:userInfo
  })
}

//根据用户id获取用户信息
export function getUserById(userId) {
  return request({
    url:`/users/${userId}`
  })
}

//修改用户信息
export function editUser(userInfo) {
  return request({
    url:`/users/${userInfo.id}`,
    method:'put',
    data:{
      email:userInfo.email,
      mobile:userInfo.mobile
    }
  })
}

//根据用户id删除该用户
export function removeUserById(userId) {
  return request({
    url:`/users/${userId}`,
    method:'delete'
  })
}

//分配用户角色
export function setUserRole(userId,roleId) {
  return request({
    url:`users/${userId}/role`,
    method:'put',
    data:{
      rid:roleId
    }
  })
}