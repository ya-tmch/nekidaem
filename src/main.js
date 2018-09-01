import lodash from 'lodash'
import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

window.axios = axios
window._ = lodash

new Vue({render: h => h(App)}).$mount('#app')
