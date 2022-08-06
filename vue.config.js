module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://114.132.71.147:38080',
        pathRewrite: {
          '^/api': ''
        },
        secure: false,
        changeOrigin: true
      }
    }
  }
}
