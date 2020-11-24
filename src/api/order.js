import request from '@/utils/request'
// import { api } from '@/config'
// // api
// const { common_api } = api

// 订单列表
export function getOrderList (params) {
  return request({
    url: '/order/list',
    method: 'get',
    params
  })
}
// 订单详情
export function getOrderDetail (id) {
  return request({
    url: `/order/${id}`,
    method: 'get'
  })
}
