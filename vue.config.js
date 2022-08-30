const { URL } = require('./src/global/config')
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: URL,
        pathRewrite: {
          '^/api': ''
        },
        secure: false,
        changeOrigin: true
      },
      '/myApi': {
        target: 'http://43.140.203.201:8884',
        pathRewrite: {
          '^/myApi': ''
        },
        secure: false,
        changeOrigin: true
      }
    }
  },
  configureWebpack: (config) => {
    //调试JS
    config.devtool = 'source-map'
  },
  css: {
    //查看CSS属于哪个css文件
    sourceMap: true
  }
}
