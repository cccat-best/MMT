module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.yuleng.top:38080',
        // target: 'http://114.132.71.147:38080/',
        pathRewrite: {
          '^/api': ''
        },
        secure: false,
        changeOrigin: true
      }
    }
  }
}
