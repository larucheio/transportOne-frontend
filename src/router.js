import VueRouter from 'vue-router'

const Home = resolve => require(['./components/Home.vue'], resolve)
const HowItWorks = resolve => require(['./components/HowItWorks.vue'], resolve)
const Vehicle = resolve => require(['./components/Vehicle.vue'], resolve)
const Reservation = resolve => require(['./components/Reservation.vue'], resolve)
const Partners = resolve => require(['./components/Partners.vue'], resolve)
const Contact = resolve => require(['./components/Contact.vue'], resolve)
const Admin = resolve => require(['./components/Admin.vue'], resolve)
const Unsubscribe = resolve => require(['./components/Unsubscribe.vue'], resolve)
const routes = [
  { path: '/home', component: Home },
  { path: '/commentcamarche', component: HowItWorks },
  { path: '/vehicule', component: Vehicle },
  { path: '/reservation', component: Reservation },
  { path: '/partenaires', component: Partners },
  { path: '/contact', component: Contact },
  { path: '/admin', component: Admin },
  { path: '/unsubscribe', component: Unsubscribe },
  { path: '/*', redirect: '/home' }
]
export const router = new VueRouter({
  routes // short for routes: routes
})
