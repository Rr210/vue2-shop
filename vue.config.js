/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-10-19 22:49:09
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-19 22:49:10
 * @LastEditors: Harry
 */
module.exports = {
  // ...
  publicPath: './',
  // vue.config.js
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Vue2-商城项目'
        return args
      })
  }
  // ...
}
