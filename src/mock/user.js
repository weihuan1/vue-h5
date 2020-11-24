import { mock, Random } from 'mockjs'
import { mockRequest } from '@/mock'
export function login () {
  return mockRequest(mock({
    token: Random.natural(20)
  }))
}
// 获取用户信息
export function getInfo () {
  return mockRequest(mock({
    username: Random.cname(),
    createTime: Random.datetime(),
    age: Random.natural(20),
    lavel: Random.natural(2, 10),
    nickname: Random.name(),
    phone: '13067057394'
  }))
}
// 上传照片
export function uploadPhoto () {
  return mockRequest(mock({
    message: 'ok'
  }))
}
