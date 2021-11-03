/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-09-22 21:36:25
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-03 09:10:55
 * @LastEditors: Harry
 */
// 导入自己需要的组件
import {
  Tree,
  MessageBox,
  Steps,
  Step,
  Select,
  Alert,
  Pagination,
  Dialog,
  Option,
  Tooltip,
  Switch,
  Tag,
  Table,
  TableColumn,
  Row,
  Timeline,
  TimelineItem,
  Tabs,
  TabPane,
  Col,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Container,
  Upload,
  Header,
  CheckboxGroup,
  Checkbox,
  Main,
  Aside,
  Input,
  Form,
  FormItem,
  Button,
  Cascader,
  Message
} from 'element-ui'

const element = {
  install: function (Vue) {
    Vue.use(BreadcrumbItem)
    Vue.use(Pagination)
    Vue.use(Dialog)
    Vue.use(Upload)
    Vue.use(Alert)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Cascader)
    Vue.use(Select)
    Vue.use(Tooltip)
    Vue.use(Tag)
    Vue.use(Step)
    Vue.use(Steps)
    Vue.use(TabPane)
    Vue.use(Tabs)
    Vue.use(Tree)
    Vue.use(Switch)
    Vue.use(Table)
    Vue.use(Timeline)
    Vue.use(TimelineItem)
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
