'use strict'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
console.log(process.env.NODE_ENV)
const port = 8080 // dev port
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/app/', // 需要区分生产环境和开发环境，不然build会报错
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/api': {
        target: `http://yapi.demo.qunar.com/mock/56700`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  configureWebpack: config => {
    // 为生产环境修改配置...
    // if (process.env.NODE_ENV === 'production') {}
    // 为开发环境修改配置...
    // if (process.env.NODE_ENV === 'development') {}
  },
  chainWebpack (config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/css/mixin.scss";`
      }
    }
  }
}
