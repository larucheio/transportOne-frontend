<template>
  <div class="container" style="padding-top:70px;">
    <nav id="navbar" class="navbar navbar-fixed-top navbar-light bg-faded">
      <div class="container">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header" aria-expanded="false" aria-label="Toggle navigation"></button>
        <button class="btn btn-outline-success float-xs-right" type="submit" @click="login" v-show="!isAuthenticated">Se connecter</button>
        <button class="btn btn-outline-success float-xs-right" type="submit" @click="logout" v-show="isAuthenticated">Se deconnecter</button>
        <div class="collapse navbar-toggleable-xs" id="navbar-header">
          <a class="navbar-brand" href="#">Transport One</a>
          <ul class="nav navbar-nav">
            <li class="nav-item active" data-toggle="collapse" data-target="#navbar-header">
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
      </div>
    </nav>
    <div>
      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import auth from './auth'
export default {
  data() {
    return {
      isAuthenticated: false,
      isAdmin: false
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
    },
    refreshAuthStatus () {
      this.isAuthenticated = auth.isAuthenticated()
      this.isAdmin = auth.isAdmin()
    }
  }
}
let lastScroll = 0
$( window ).scroll(function() {
  console.log(`${lastScroll} ${$(window).scrollTop()}`)
  if($(window).scrollTop() > lastScroll) {
        $('#navbar').slideUp(500, function () {})
    } else {
        $('#navbar').slideDown(500, function () {})
    }
    lastScroll = $(window).scrollTop()
})
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

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
</style>
