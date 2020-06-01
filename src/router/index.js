import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HtmlView from '@/components/HtmlView'
import Login from '@/components/Login'
import HtmlManage from '@/components/HtmlManage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/htmlView',
          name: '网址浏览',
          component: HtmlView
        },
        {
          path: '/htmlManage',
          name: '网址管理',
          component: HtmlManage
        }
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
