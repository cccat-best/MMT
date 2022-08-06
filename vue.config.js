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
      }
    }
  }
}
