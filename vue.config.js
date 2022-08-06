module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://43.142.146.75:38080',
        pathRewrite: {
          '^/api': ''
        },
        secure: false,
        changeOrigin: true
      }
    }
  }
}
