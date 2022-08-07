import Vue from 'vue'
import Vuex from 'vuex'
import problem from './modules/problem'
import transform from './modules/transform'
import dataBoard from './modules/dataBoard'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { problem, transform, dataBoard }
})
