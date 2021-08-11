import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import LightBootstrap from './light-bootstrap-main'

Vue.config.productionTip = false
Vue.use(LightBootstrap)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
