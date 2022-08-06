const { URL } = require('./src/global/config')
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.yuleng.top:38080',
        pathRewrite: {
          '^/api': ''
        },
        secure: false,
        changeOrigin: true
      }
    }
  }
}
