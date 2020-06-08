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