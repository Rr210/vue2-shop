import Vue from 'vue'
import mitt from 'mitt' // EventBus
import App from './App.vue'
import router from './router'
import VueQuillEditor from 'vue-quill-editor' // 富文本
// css样式还是需要全部引入
import axios from 'axios' // for bubble theme
import element from './plugin/elements.js'
import './assets/css/global.css'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueQuillEditor)
// 配置axios
axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})
axios.defaults.baseURL = 'https://sapi.mr90.top/api/private/v1/'
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
