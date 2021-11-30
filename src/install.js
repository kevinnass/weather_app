/*
App
Created at 09/04/2021 11:44
Author: Khaliq ALI
 */
import './assets/style/css/tailwind.css'
import './assets/style/css/style.css'
import './assets/style/sass/main.scss'
import './assets/style/sass/mixin.scss'
import '@/components/icons'
import SvgIcon from 'vue-svgicon'
export default {
  install (Vue, options) {
    Vue.use(SvgIcon, {
      tagName: 'svgIcon'
    })
  }
}
