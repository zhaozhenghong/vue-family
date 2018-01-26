import npmSimpleJsonp from 'jsonp' /* jsonp扩展地址 https://github.com/webmodules/jsonp */

export default function jsonp(url, option) {
  return new Promise((resolve, reject) => {
    npmSimpleJsonp(url, option, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
