import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)
import Layout from '../views/layout/layout'
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {
          keepAlive: false,
          title: '首页'
        },
        beforeEnter: (to, from, next) => {
          store.commit('TOGGLE_TABBAR', 'home')
          next()
        }
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/index'),
        meta: {
          title: '搜索',
          login: true
        },
        beforeEnter: (to, from, next) => {
          store.commit('TOGGLE_TABBAR', 'search')
          next()
        }
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: {
          title: '订单',
          useCache: true,
          keepAlive: true
        },
        beforeEnter: (to, from, next) => {
          store.commit('TOGGLE_TABBAR', 'order')
          next()
        }
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/mine/index'),
        meta: {
          title: '我的'
        },
        beforeEnter: (to, from, next) => {
          store.commit('TOGGLE_TABBAR', 'mine')
          next()
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/mine/info'),
    meta: {
      title: '个人资料',
      login: true
    }
  },
  {
    path: '/orderDetail/:id',
    name: 'orderDetail',
    component: () => import('@/views/order/order-detail'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/revise/:type',
    name: 'revise',
    component: () => import('@/views/mine/revise'),
    meta: {
      title: '个人资料'
      // login: true
    }
  }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

export default createRouter()
