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
import * as order from './order'
import * as user from './user'
export default checkApi(order, user)
