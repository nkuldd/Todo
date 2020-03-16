// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//使用element-ui组件库完成页面样式 使用router完成单页路由 使用axios封装原生ajax
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import axios from 'axios'
Vue.prototype.$ajax=axios
//axios.defaults.baseURL='/api'
Vue.use(element)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
