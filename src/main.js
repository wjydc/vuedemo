import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import axios from 'axios'
import vueCookie from 'vue-cookies'
// 注册全局 变量+方法
import globalConst from './globalconst.js'
// 注册全局组件
import CRcompont from './assets/js/CR-components.js'
Vue.use(CRcompont)
Vue.use(globalConst)
Vue.use(vueCookie)
// 数据请求
Vue.prototype.$axios = axios

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
