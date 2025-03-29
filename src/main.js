import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { pokeStore } from './store/pokeStore'

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store: pokeStore,
  render: h => h(App),
}).$mount('#app');
