export default {
  namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名
  // 用于存储数据
  state: () => ({
    all: {
      Id: '',
      psw: ''
    }
  }),
  // 用于操作数据
  mutations: {
    tranformAll(state, item) {
      state.all = item
    },
    // 清除函数
    clearData(state) {
      state.all.Id = ''
      state.all.psw = ''
    }
  },
  getters: {}
}
