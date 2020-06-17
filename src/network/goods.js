import {request} from "./request";

//获取商品分类数据

export function getCategory(paramInfo){
  return request({
    url:'/categories',
    data:paramInfo
  })
}