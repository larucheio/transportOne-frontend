import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'bootstrap/scss/bootstrap.scss'
import './style/style.scss'
Vue.use(VueResource)
Vue.use(VueRouter)

const Home = resolve => require(['./components/Home.vue'], resolve)
const HowItWorks = resolve => require(['./components/HowItWorks.vue'], resolve)
const Vehicle = resolve => require(['./components/Vehicle.vue'], resolve)
const Pricing = resolve => require(['./components/Pricing.vue'], resolve)
const Partners = resolve => require(['./components/Partners.vue'], resolve)
const Contact = resolve => require(['./components/Contact.vue'], resolve)
const routes = [
  { path: '/home', component: Home },
  { path: '/commentcamarche', component: HowItWorks },
  { path: '/vehicule', component: Vehicle },
  { path: '/tarifs', component: Pricing },
  { path: '/partenaires', component: Partners },
  { path: '/contact', component: Contact },
  { path: '/*', redirect: '/home' }
]
const router = new VueRouter({
  routes // short for routes: routes
})
const App = Vue.extend(require('./App.vue'))
new App({
  router
}).$mount('#app')
