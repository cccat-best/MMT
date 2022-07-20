module.exports = {
  devServer: {
    "/api": {
      // 要发送请求的服务器地址
      target: '',
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
