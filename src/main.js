import Vue from 'vue'
import App from './App'
import router from './router'
// 导入element-ui组件库
import ElementUI from 'element-ui'
// 导入全局css样式
import './assets/css/global.css'
// 引入字体图标的样式
import './assets/fonts/iconfont.css'
// 引入axios
import axios from 'axios'

// 为axios挂载token请求头,需要使用request拦截器实现
axios.interceptors.request.use(function (config) {
  // 手动为axios的请求,追加 Authorization 请求头
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// 设置axios的根目录
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 挂载axios
Vue.prototype.$http = axios
// 安装elementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
