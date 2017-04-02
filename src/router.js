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
  {
    path: '/',
    component: Home,
    meta: {
      title: `Transport One - Transport accompagné de personnes agées ou à mobilité réduite sur Genève`,
      description: `Tranport One est une entreprise de transport spécialisée dans le transport accompagné de personnes à mobilité réduite comme les personnes agées ou handicapées sur Genève. Notre service est soigné et nos prix sont les plus bas du marché.`
    }
  },
  {
    path: '/commentcamarche',
    component: HowItWorks,
    meta: {
      title: `Mode d'emploi, comment ça marche? - Transport One`,
      description: `Coment ça marche? C'est tout simple: réserver sur notre site, via notre application ou par téléphone.`
    }
  },
  {
    path: '/vehicule',
    component: Vehicle,
    meta: {
      title: `Véhicules et équipements prêts à vous emmener partout à Genève - Transport One`,
      description: `Nos véhicules et équipements prêts à vous emmener partout à Genève confortablement.`
    }
  },
  {
    path: '/reservation',
    component: Reservation,
    meta: {
      title: `Réserver votre transport privé - Transport One`,
      description: `Réserver votre transport privé.`
    }
  },
  {
    path: '/partenaires',
    component: Partners,
    meta: {
      title: `Laissez-nous votre avis et découvrez nos partenaires - Transport One`,
      description: `Laissez-nous votre avis sur votre expérience avec Transport One et découvrez nos partenaires.`
    }
  },
  {
    path: '/contact',
    component: Contact,
    meta: {
      title: `Pour toutes demandes, nous restons à votre contact! - Transport One`,
      description: `Pour toutes demandes, nous restons à votre contact!`
    }
  },
  {
    path: '/admin',
    component: Admin,
    meta: {
      title: `Transport One - Admin`,
      description: `Transport One Admin`
    }
  },
  {
    path: '/unsubscribe',
    component: Unsubscribe,
    meta: {
      title: `Se désinscrire de la newsletter - Transport One`,
      description: `Se désinscrire de la newsletter - Transport One`
    }
  },
  {
    path: '/*',
    redirect: '/'
  }
]
const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  document.head.querySelector('[name=description]').content = to.meta.description
  next()
})

export default router
