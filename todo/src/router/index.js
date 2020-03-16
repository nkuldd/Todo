import Vue from 'vue'
import Router from 'vue-router'
import todo from '@/components/todo'

Vue.use(Router)
//只需要一个组件
export default new Router({
  routes: [
    {
      path: '/',
      name: 'todo',
      component: todo
    }
  ]
})
