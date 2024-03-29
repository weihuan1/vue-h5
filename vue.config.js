'use strict'
const path = require('path')
const pxtorem = require('postcss-pxtorem')
const CopyPlugin = require("copy-webpack-plugin");
const loaderUtils = require('loader-utils')
const fs = require('fs-extra');
const { webpConfig, getPath, getHashJson } = require('./build/webp.js')
function resolve (dir) {
  return path.join(__dirname, dir)
}

const port = 8080 // dev port
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './', // 需要区分生产环境和开发环境，不然build会报错
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
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

  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './cache-webp'),
            to: path.resolve(__dirname, './dist/cache-webp')
          },
        ],
      })
    ],
  },
  chainWebpack (config) {
    config.module
      .rule('images')
      .test(webpConfig.rule)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 0,
        emitFile: false,
        publicPath: (url, resource, context) => {
          const hashJson = getHashJson()
          const rootePath = getPath(webpConfig.rootPath)
          const entryPath = getPath(webpConfig.entry)
          const outputPath = getPath(webpConfig.output)
          const contextPath = getPath(context)
          const resourcePath = getPath(loaderUtils.urlToRequest(resource))
          const resourceExtname = resourcePath.replace(path.extname(resourcePath), '')
          const hashPath = resourcePath.replace(rootePath, '')
          const hash = hashJson[hashPath]
          const newSource = resourceExtname.replace(entryPath, outputPath)
          const resultSource = `${newSource.replace(contextPath, '')}.${hash}.webp`
          // console.log({
          //   url,
          //   hash,
          //   resourceExtname,
          //   newSource,
          //   entryPath,
          //   outputPath,
          //   contextPath,
          //   resultSource,
          //   hashJson
          // })
          return resultSource
        },
      })
    // 单独配置mand-mobile 组件库pxtorem处理
    config.module
      .rule('md-postcss')  // 新增规则，规则名自定义
      .test(/mand-mobile.*\.css$/)  // 用正则表达式匹配mand-mobile的组件目录下的所有css文件
      .use('css-loader')  // css加载器
      .loader('postcss-loader')  // css处理器
      .options({  // 这里的内容跟方法一中css.loaderOptions一样
        plugins: [
          pxtorem({
            rootValue: 75,
            minPixelValue: 2,
            propList: ['*'],
            selectorBlackList: []
          })
        ]
      })
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
