const { URL } = require('./src/global/config')
module.exports = {
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
  }
}
