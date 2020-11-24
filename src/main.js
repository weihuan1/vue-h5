import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/assets/css/index.scss' // global css

// vant ui
import Vant from 'vant/lib'
Vue.use(Vant)

// 公共components
import xtUi from './components'

// 移动端适配
import 'lib-flexible/flexible.js'

import App from './App.vue'
import router from './router'
import store from './store'

import '@/filters' // filters
import '@/permission' // permission 权限
import api from '@/api'
import { mockApi } from '@/mock'

if (process.env.NODE_ENV === 'production') {
  Vue.prototype.$api = api
} else {
  Vue.prototype.$api = mockApi
  console.log(mockApi)
}
Vue.use(xtUi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 解决打包后样式顺序错乱问题
import 'vant/lib/index.css'
