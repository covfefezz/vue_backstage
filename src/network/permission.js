import {request} from "./request";

//获取权限列表
export function getRights() {
  return request({
    url:'/rights/list'
  })
}