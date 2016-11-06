<template>
  <div class="container">
    <nav class="navbar navbar-light bg-faded">
      <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header" aria-expanded="false" aria-label="Toggle navigation"></button>
      <button class="btn btn-outline-success float-xs-right" type="submit" @click="login" v-show="!isAuthenticated">Se connecter</button>
      <button class="btn btn-outline-success float-xs-right" type="submit" @click="logout" v-show="isAuthenticated">Se deconnecter</button>
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
            <router-link class="nav-link" to="/admin" v-show="isAdmin">Admin</router-link>
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
import auth from './auth'
import Auth0Lock from 'auth0-lock'

const options = {
  theme: {
    primaryColor: 'black',
    logo: ''
  },
  languageDictionary: {
    emailInputPlaceholder: 'name@email.com',
    title: 'Se connecter'
  }
}

export default {
  data () {
    return {
      isAuthenticated: false,
      isAdmin: false,
      lock: new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, options)
    }
  },
  mounted () {
    let self = this
    this.isAuthenticated = auth.isAuthenticated()
    this.isAdmin = auth.isAdmin()
    this.lock.on('authenticated', function (authResult) {
      localStorage.setItem('id_token', authResult.idToken)
      self.lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          alert("Erreur: votre profile n'a pas été retrouvé.")
          return
        }
        localStorage.setItem('profile', JSON.stringify(profile))

        self.isAuthenticated = auth.isAuthenticated()
        self.isAdmin = auth.isAdmin()
        self.lock.hide()
      })
    })
    this.lock.on('authorizaton_error', (error) => {
      alert("Erreur: echec de l'authorisation.")
    })
  },
  methods: {
    login () {
      this.lock.show()
    },
    logout () {
      this.isAuthenticated = false
      this.isAdmin = false
      localStorage.removeItem('id_token')
      localStorage.removeItem('profile')
      this.$router.push('/home')
    }
  }
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
