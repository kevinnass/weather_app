import './assets/style/css/tailwind.css'
import './assets/style/css/style.css'
import './assets/style/sass/main.scss'
import './assets/style/sass/mixin.scss'
import '@/components/icons'
import VueCountryCode from "vue-country-code-select";
import SvgIcon from 'vue-svgicon'

export default {
  install (Vue, options) {
    Vue.use(SvgIcon, {
      tagName: 'svgIcon'
    })
    Vue.use(VueCountryCode);
  }
}
