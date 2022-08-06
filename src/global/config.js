// 将 .env 文件中的数据注入到环境中
require('dotenv').config()
const URL = process.env.URL || ''
// 做一个中转, 将环境中的变量取出
module.exports = {
  URL
}
