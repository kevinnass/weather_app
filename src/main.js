/*
App
Created at 09/04/2021 11:44
Author: Khaliq ALI
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import install from './install'
import store from './store'

Vue.use(install)
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
