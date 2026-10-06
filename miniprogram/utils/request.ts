// utils/request.ts
// diet_server 地址。真机上手机要访问的是电脑,不能写 127.0.0.1(那指向手机自己),
// 得用电脑的局域网 IP。IP 变了就 ipconfig 重新查一下 WLAN 的 IPv4。
// 另外真机必须开调试模式(真机调试 / 预览后右上角 ... 打开调试),否则小程序
// 会拦掉非 https、未备案的域名,报 request:fail url not in domain list。
const BASE_URL = 'http://192.168.101.2:8000'

/** wx.request 能返回的响应体类型 */
type RequestData = string | WechatMiniprogram.IAnyObject | ArrayBuffer

/** GET 请求,包一层 Promise 方便用 async/await。非 2xx 状态码会 reject。 */
export function get<T extends RequestData>(path: string): Promise<T> {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + path,
      method: 'GET',
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T)
        } else {
          reject(new Error(`HTTP ${res.statusCode}`))
        }
      },
      fail: (err) => reject(new Error(err.errMsg)),
    })
  })
}
