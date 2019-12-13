import request from '@/utils/request'
// import { api } from '@/config'
// // api
// const { common_api } = api

// 登录
export function getOrderList (params) {
  return request({
    url: '/order/list',
    method: 'get',
    params
  })
}
// 获取用户信息
export function getOrderDetail (id) {
  return request({
    url: `/order/${id}`,
    method: 'get'
  })
}
