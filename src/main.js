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
import App from './App'
import store from './store'
import router from './router'
import '@/filters' // filters
import '@/permission' // permission 权限
// 解决移动端click事件300毫秒延迟方法
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function () {
      FastClick.prototype.onTouchMove = function (event) {
        event.stopPropagation()
        event.cancelBubble = true
      }
      FastClick.prototype.onTouchEnd = function (event) {
        event.stopPropagation()
        event.cancelBubble = true
      }
      FastClick.attach(document.body)
    },
    false
  )
}
Vue.use(Vant)
Vue.use(xtUi)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
