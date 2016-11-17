import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import './style/style.scss'
import {router} from './router.js'
Vue.use(VueResource)
Vue.use(VueRouter)

window.jQuery = require('jquery')
window.$ = window.jQuery
window.Tether = require('tether')
require('bootstrap')

const App = Vue.extend(require('./App.vue'))
new App({
  router
}).$mount('#app')
