import Vue from 'vue'
import Router from 'vue-router'
// 引入login模块
import login from '@/components/login'
// 引入home模块
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/login'}, // 用户访问/路径重定向到/login
    {
      path: '/login', component: login // 路页面的路由规则
    },
    {path: '/home', component: Home}// 后台主页的路由规则
  ]
})
