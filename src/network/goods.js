import {request} from "./request";

//获取商品分类数据

export function getCategory(paramInfo){
  return request({
    url:'/categories',
    method:'get',
    params:paramInfo
  })
}

//添加分类
export function addCategory(paramInfo) {
  return request({
    url:'/categories',
    method: 'post',
    data:paramInfo
  })
}