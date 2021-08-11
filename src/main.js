import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import LightBootstrap from './light-bootstrap-main'

Vue.config.productionTip = false
Vue.use(LightBootstrap)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
