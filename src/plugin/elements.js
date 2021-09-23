/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-09-22 21:36:25
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-23 14:50:57
 * @LastEditors: Harry
 */
// 导入自己需要的组件
import { Input, Form, FormItem, Button, Message } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Input)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Button)
  },
  other: {
    Message
  }
}
export default element
