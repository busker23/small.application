import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Manager from '../views/Manager.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem('auth') === 'true'
  let isAdmin = localStorage.getItem('admin') === 'true'
  if ((to.name !== 'Login' && to.name !== 'Register' && !isAuthenticated || to.name == 'Manager' && !isAdmin)) next({ name: 'Login' })
  else if (to.name == 'User' && isAdmin) next({ name: 'Login' })
  else next()
})

export default router
