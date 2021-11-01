import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import User from '../components/user/User'
import Home from '../views/Home'
import Welcome from '../views/Welcome'
import Rights from '../components/power/Right'
import Roles from '../components/power/Roles'
import Goods from '../components/goods/Goods'
import Add from '../components/goods/Add'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/login'
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: User },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/goods', component: Goods },
      { path: '/goods/add', component: Add }
    ]
  }
]
const router = new VueRouter({
  routes
})
// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
