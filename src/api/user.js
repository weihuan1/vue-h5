import request from '@/utils/request'
// import { api } from '@/config'
// // api
// const { common_api } = api

// 登录
export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo (data) {
  return request({
    url: '/userinfo',
    method: 'get',
    data
  })
}
// 上传照片
export function uploadPhoto (data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}
