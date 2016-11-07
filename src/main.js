import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import './style/style.scss'
Vue.use(VueResource)
Vue.use(VueRouter)

window.jQuery = require('jquery')
window.$ = window.jQuery
window.Tether = require('tether')
require('bootstrap')

window.regions = ['AEROPORT DE GENEVE', 'GARE DE GENEVE-CORNAVIN', 'AUTRE DESTINATION', 'AIRE-LA-VILLE', 'ANIERES', 'AVULLY', 'AVUSY', 'BARDONNEX', 'BELLEVUE', 'BERNEX', 'CAROUGE', 'CARTIGNY', 'CELIGNY', 'CHANCY', 'CHENE-BOUGERIES', 'CHENE-BOURG', ' CHOULEX', 'COLLEX-BOSSY', 'COLLONGE-BELLERIVE', 'COLOGNY', 'CONFIGNON', 'CORSIER', 'DARDAGNY', 'GENTHOD', 'GRAND-SACONNEX', ' GY', 'HERMANCE', 'JUSSY', 'LACONNEX', 'LANCY', 'MEINIER', 'MEYRIN', 'ONEX', 'PERLY-CERTOUX', 'PLAN-LES-OUATES', ' PREGNY-CHAMBESY', 'PRESINGE', 'PUPLINGE', 'RUSSIN', 'SATIGNY', 'SORAL', 'THONEX', 'TROINEX', 'VANDOEUVRES', 'VERNIER', 'VERSOIX', 'VEYRIER', 'VILLE DE GENEVE']

const Home = resolve => require(['./components/Home.vue'], resolve)
const HowItWorks = resolve => require(['./components/HowItWorks.vue'], resolve)
const Vehicle = resolve => require(['./components/Vehicle.vue'], resolve)
const Reservation = resolve => require(['./components/Reservation.vue'], resolve)
const Partners = resolve => require(['./components/Partners.vue'], resolve)
const Contact = resolve => require(['./components/Contact.vue'], resolve)
const Admin = resolve => require(['./components/Admin.vue'], resolve)
const routes = [
  { path: '/home', component: Home },
  { path: '/commentcamarche', component: HowItWorks },
  { path: '/vehicule', component: Vehicle },
  { path: '/reservation', component: Reservation },
  { path: '/partenaires', component: Partners },
  { path: '/contact', component: Contact },
  { path: '/admin', component: Admin },
  { path: '/*', redirect: '/home' }
]
export const router = new VueRouter({
  routes // short for routes: routes
})
const App = Vue.extend(require('./App.vue'))
new App({
  router
}).$mount('#app')
