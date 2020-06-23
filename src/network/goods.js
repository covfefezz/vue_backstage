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

//获取分类参数
export function getCategoryParams(id,sel) {
  return request({
    url:`/categories/${id}/attributes`,
    method:'get',
    params:{
      sel
    }
  })
}

//编辑参数选项
export function editCategoryParams(cat_id,attr_id,paramInfo) {
  return request({
    url:`categories/${cat_id}/attributes/${attr_id}`,
    method:'put',
    data:paramInfo
  })
}