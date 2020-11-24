import * as order from './order'
import * as user from './user'
function checkApi () {
  var result = {}
  Array.from(arguments).map(item => {
    for (const i in item) {
      if (!result[i]) {
        result[i] = item[i]
      } else {
        console.error('存在重复的api:' + i)
      }
    }
  })
  return result
}
export const mockApi = checkApi(order, user)
export function mockRequest (data) {
  return new Promise((resolve, reject) => {
    let delay = setTimeout(() => {
      const resultData = {
        code: 0,
        result: data
      }
      console.log('接口返回数据', resultData)
      resolve(resultData)
      clearTimeout(delay)
    }, 1000)
  })
}
