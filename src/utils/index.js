/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
/**
* @param {Number} length
* @param {Arrary} arr
* @returns {Arrary}
*/
export function sliceArray (length, arr) {
  if (!arr || arr.length === 0) return []
  var allData = []
  var currData = []
  for (let i = 0; i < arr.length; i++) {
      currData.push(arr[i])
      if ((i !== 0 && (i + 1) % length === 0) || i === arr.length - 1) {
        allData.push(currData)
        currData = []
      }
  }
  return allData
}
