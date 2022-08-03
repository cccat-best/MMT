// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         // 要发送请求的服务器地址
//         target: 'http://119.29.27.252:38080',
//         pathRewrite: {
//           '^/api': ''
//         },
//         secure:false,
//         changeOrigin:true,
//       }
//     }
//   },
//   lintOnSave: false
// }
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://119.29.27.252:38080',
        pathRewrite: {
          '^/api': ''
        },
        secure: false,
        changeOrigin: true
      }
    }
  }
}
