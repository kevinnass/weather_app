/*
App
Created at 09/04/2021 11:44
Author: Khaliq ALI
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import apiRoutes from './router/api-routes'
// import http from './plugins/http'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {},
  mutations: {},
  actions: {},
  getters: {}
})
