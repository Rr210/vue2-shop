/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-09-22 21:36:25
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-27 16:29:27
 * @LastEditors: Harry
 */
// 导入自己需要的组件
import {
  Tree,
  MessageBox,
  Select,
  Pagination,
  Dialog,
  Option,
  Tooltip,
  Switch,
  Tag,
  Table,
  TableColumn,
  Row,
  Col,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Container,
  Header,
  Main,
  Aside,
  Input,
  Form,
  FormItem,
  Button,
  Message
} from 'element-ui'

const element = {
  install: function (Vue) {
    Vue.use(BreadcrumbItem)
    Vue.use(Pagination)
    Vue.use(Dialog)
    Vue.use(Select)
    Vue.use(Tooltip)
    Vue.use(Tag)
    Vue.use(Tree)
    Vue.use(Switch)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Option)
    Vue.use(Card)
    Vue.use(Breadcrumb)
    Vue.use(Input)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Button)
    Vue.use(Container)
    Vue.use(Header)
    Vue.use(Main)
    Vue.use(Aside)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(MenuItemGroup)
  },
  other: {
    Message, MessageBox
  }
}
export default element
