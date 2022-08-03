import Vue from 'vue'
import Vuex from 'vuex'
import problem from './problem'
import dataBoard from './dataBoard'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { problem, dataBoard }
})
