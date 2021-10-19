import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import mitt from 'mitt'
// css样式还是需要全部引入
import element from './plugin/elements.js'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// 配置axios
axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})
axios.defaults.baseURL = 'http://sapi.mr90.top/api/private/v1/'
Vue.use(element)
Vue.prototype.$message = element.other.Message
Vue.prototype.$confirm = element.other.MessageBox.confirm
Vue.prototype.$bus = mitt()
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
