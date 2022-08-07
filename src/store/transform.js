// 用于存储数据
const state = {
  all: {
    Id: '20200001',
    psw: '123456'
  }
}
const getters = {}
// 用于操作数据
const mutations = {
  tranformAll(state, item) {
    state.all = item
  }
}
//用于响应
const actions = {}
export default {
  namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
