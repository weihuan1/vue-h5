import router from './router'
// import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    // 判断需要登录
    if (to.meta.login && !getToken()) {
      next(`/login?redirect=${to.path}`)
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
