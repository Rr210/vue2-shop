import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import User from '../components/user/User'
import Home from '../views/Home'
import Welcome from '../views/Welcome'
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
      { path: '/users', component: User }
    ]
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
