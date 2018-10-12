import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // 路由跳转 页面回到顶部
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./views/detail.vue') // 被访问时加载
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('./views/catalog.vue')
    },
    {
      path: '/reading',
      name: 'reading',
      component: () => import('./views/reading.vue')
    }
  ]
})
