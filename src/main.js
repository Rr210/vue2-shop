import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
// css样式还是需要全部引入
import 'element-ui/lib/theme-chalk/index.css'
import element from './plugin/elements.js'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
Vue.use(element)
Vue.config.productionTip = false
Vue.prototype.$message = element.other.Message
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
