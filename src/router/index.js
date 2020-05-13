import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Html'
import Login from '@/components/Login'
import HtmlManage from '@/components/HtmlManage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/htmlManage',
          name: 'htmlManage',
          component: HtmlManage
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
