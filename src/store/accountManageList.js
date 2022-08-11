export default {
  namespaced: true,
  state: () => ({
    time: []
  }),
  mutations: {
    //更新允许报名时间
    updateTime(state, timer) {
      state.time = timer
    }
  },
  getters: {}
}
