<template>
  <div class="container">
    <nav class="navbar navbar-light bg-faded">
      <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header" aria-expanded="false" aria-label="Toggle navigation"></button>
      <button class="btn btn-outline-success float-xs-right" type="submit" @click="login" v-show="authenticated === 0">Se connecter</button>
      <button class="btn btn-outline-success float-xs-right" type="submit" @click="logout" v-show="authenticated > 0">Se deconnecter</button>
      <div class="collapse navbar-toggleable-xs" id="navbar-header">
        <a class="navbar-brand" href="#">Transport One</a>
        <ul class="nav navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/commentcamarche">Comment ça marche?</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/vehicule">Véhicule</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/reservation">Reservation</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/partenaires">Partenaires</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/admin" v-show="authenticated === 2">Admin</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="col-sm-9">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/* global localStorage */
import Auth0Lock from 'auth0-lock'
const options = {
  theme: {
    primaryColor: 'black'
  },
  languageDictionary: {
    emailInputPlaceholder: 'name@email.com',
    title: 'Se connecter'
  }
}
export default {
  data () {
    return {
      authenticated: 0,
      lock: new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, options)
    }
  },
  created () {
    let self = this
    this.authenticated = checkAuth()
    this.lock.on('authenticated', function (authResult) {
      self.lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          // Handle error
          return
        }
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem('profile', JSON.stringify(profile))
        self.authenticated = checkAuth()
        self.lock.hide()
      })
    })
  },
  methods: {
    login () {
      this.lock.show()
    },
    logout () {
      let self = this
      localStorage.removeItem('id_token')
      localStorage.removeItem('profile')
      self.authenticated = 0
      this.$router.push('/home')
    }
  }
}
// Utility to check auth status
function checkAuth () {
  if (localStorage.getItem('id_token')) {
    if (localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile')).isAdmin) {
      return 2
    } else {
      return 1
    }
  }
  return 0
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
