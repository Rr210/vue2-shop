/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-11-02 11:54:00
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-02 11:55:05
 * @LastEditors: Harry
 */
function transiTime(timestamp) {
  /**
   *  时间戳转时间（10位）
   */
  const date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear()
  const M =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1

  function change(stage) {
    if (stage < 10) {
      return '0' + stage
    } else {
      return stage
    }
  }
  const D = change(date.getDate())
  const h = change(date.getHours()) // 小时
  const m = change(date.getMinutes()) // 分钟
  // const s = change(date.getSeconds()) // 秒
  // return Y + M + D + h + m
  return `${Y}-${M}-${D} ${h}:${m}`
}
export default {
  transiTime
}
