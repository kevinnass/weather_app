/*
App
Created at 09/04/2021 11:44
Author: Khaliq ALI
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import pathResolver from '@/plugins/loader'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'About',
    component: pathResolver('about', 'index')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    // retourner la position désirée
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        return { selector: to.hash }
      } else {
        return { x: 0, y: 0 }
      }
    }
  }
})

export default router
