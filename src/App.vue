<template>
  <div class="container">
    <nav class="navbar navbar-light bg-faded">
      <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header" aria-expanded="false" aria-label="Toggle navigation"></button>
      <button class="btn btn-outline-success float-xs-right" type="submit" @click="login" v-show="!auth.isAuthenticated()">Se connecter</button>
      <button class="btn btn-outline-success float-xs-right" type="submit" @click="logout" v-show="auth.isAuthenticated()">Se deconnecter</button>
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
            <router-link class="nav-link" to="/admin" v-show="auth.isAdmin()">Admin</router-link>
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
import {auth} from './auth'

export default {
  data() {
    return {
      auth: auth
    }
  },
  mounted () {
    auth.init()
  },
  methods: {
    login () {
      auth.login()
    },
    logout () {
      auth.logout()
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
