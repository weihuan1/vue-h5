import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/assets/css/index.scss' // global css

// vant ui
import Vant from 'vant/lib'
import 'vant/lib/index.css'

// 公共components
import xtUi from './components'

// 移动端适配
import 'lib-flexible/flexible.js'

import App from './App.vue'
import router from './router'
import store from './store'

import '@/filters' // filters
import '@/permission' // permission 权限

Vue.use(Vant)
Vue.use(xtUi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
