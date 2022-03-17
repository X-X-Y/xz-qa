import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI);

import axios from 'axios';
axios.defaults.baseURL="http://localhost:3001";
Vue.prototype.axios=axios;

import qs from 'qs';
Vue.prototype.qs=qs;

import moment from 'moment';
Vue.prototype.moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
