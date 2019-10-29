import request from '@/utils/request'
import { api } from '@/config'
// api
const { common_api } = api

// 登录
export function login (data) {
  return request({
    url: common_api + '/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo (data) {
  return request({
    url: common_api + '/userinfo',
    method: 'get',
    data
  })
}
