import Vue from 'vue'
import Router from 'vue-router'
// 引入login模块
import login from '@/components/login'
// 引入home模块
import Home from '@/components/home'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', redirect: '/login'}, // 用户访问/路径重定向到/login
    {
      path: '/login', component: login // 路页面的路由规则
    },
    {path: '/home', component: Home}// 后台主页的路由规则
  ]
})

// 路由守卫 router.beforeEach((to,from,next) => {})
// router.beforeEach((to, from, next) => {
//   // 如果用户访问的是登录页面,直接放行
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = sessionStorage.getItem('token')
//   // 如果token存在,直接放行
//   if (tokenStr) return next()
//   // 否则,强制跳转到登录页
//   next('/login')
// })
router.beforeEach((to, from, next) => {
  // 如果用户访问的是登录界面,直接放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = sessionStorage.getItem('token')
  // 如果有token直接放行
  if (tokenStr) return next()
  // 没有,调到登录页
  next('/login')
})

export default router
