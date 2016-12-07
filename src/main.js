import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import './style/style.scss'
import {router} from './router.js'
import Input from './components/Input.vue'
import Button from './components/Button.vue'
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.component('custom-input', Input)
Vue.component('custom-button', Button)

window.jQuery = require('jquery')
window.$ = window.jQuery
window.Tether = require('tether')
require('bootstrap')

const App = Vue.extend(require('./App.vue'))
new App({
  router
}).$mount('#app')

if ('serviceWorker' in navigator) {
  const register = require('serviceworker!./service-worker.js')
  window.addEventListener('load', function () {
    register({scope: '/'}).then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }).catch(function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err)
    })
  })
}
