import { mock, Random } from 'mockjs'
import { mockRequest } from '@/mock'
// import { api } from '@/config'
// // api
// const { common_api } = api

// 订单列表
export function getOrderList (params) {
  return mockRequest(mock({
    'data|10': [{
      'id|+1': 1,
      name: Random.name(),
      time: Random.datetime()
    }],
    total: Random.natural(20)
  }))
}
// 订单详情
export function getOrderDetail (id) {
  return mockRequest({
    name: Random.name(),
    time: Random.datetime()
  })
}
