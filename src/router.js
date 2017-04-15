import VueRouter from 'vue-router'

const Home = resolve => require(['./components/Home.vue'], resolve)
const HowItWorks = resolve => require(['./components/HowItWorks.vue'], resolve)
const Vehicule = resolve => require(['./components/Vehicule.vue'], resolve)
const Reservation = resolve => require(['./components/Reservation.vue'], resolve)
const Partners = resolve => require(['./components/Partners.vue'], resolve)
const Contact = resolve => require(['./components/Contact.vue'], resolve)
const Admin = resolve => require(['./components/Admin.vue'], resolve)
const Unsubscribe = resolve => require(['./components/Unsubscribe.vue'], resolve)
const routes = [
  { path: '/', component: Home },
  { path: '/commentcamarche', component: HowItWorks },
  { path: '/vehicule', component: Vehicule },
  { path: '/reservation', component: Reservation },
  { path: '/partenaires', component: Partners },
  { path: '/contact', component: Contact },
  { path: '/admin', component: Admin },
  { path: '/unsubscribe', component: Unsubscribe },
  { path: '/*', redirect: '/' }
]
export const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes // short for routes: routes
})
