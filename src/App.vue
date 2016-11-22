<template>
  <div class="container" style="padding-top:70px;">
    <nav id="navbar" class="navbar navbar-fixed-top navbar-light bg-faded">
      <div class="container hidden-lg-up">
        <router-link class="navbar-brand" to="/home">Transport One</router-link>
        <div class="to-navbar-toggler float-xs-right" @click="animeHamburgerButton" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header" aria-expanded="false" aria-label="Toggle navigation">
          <div class="to-bar1"></div>
          <div class="to-bar2"></div>
          <div class="to-bar3"></div>
        </div>
      </div>
      <div class="container">
        <div class="collapse navbar-toggleable-md" id="navbar-header">
          <router-link class="navbar-brand hidden-md-down" to="/home">Transport One</router-link>
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/commentcamarche">Comment ça marche?</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/vehicule">Véhicule</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/reservation">Reservation</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/partenaires">Partenaires</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">Contact</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin" v-show="isAdmin">Admin</router-link>
            </li>
            <button class="btn btn-outline-success float-lg-right" type="submit" @click="login" v-show="!isAuthenticated">Se connecter</button>
            <button class="btn btn-outline-success float-lg-right" type="submit" @click="logout" v-show="isAuthenticated">Se deconnecter</button>
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
    },
    animeHamburgerButton () {
      $('.to-navbar-toggler').toggleClass("to-change")
    }
  }
}
let lastScroll = 0
$(window).scroll(function () {
  if ($(window).scrollTop() - lastScroll > 50) {
    $('#navbar').addClass("to-navbar-hidden")
    lastScroll = $(window).scrollTop()
  } else if ($(window).scrollTop() - lastScroll < -50) {
    $('#navbar').removeClass("to-navbar-hidden")
    lastScroll = $(window).scrollTop()
  }
})

//collapse mobile menu on click
$(document).ready(function () {
  $('.navbar-nav li a, .navbar-brand').click(function (event) {
    if ($(event.target).is('a')) {
      $('.collapse').collapse('hide')
      $('.to-navbar-toggler').toggleClass("to-change")
    }
  })
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
body {
  background-color: #ecf0f1;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .1s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}

.to-navbar-toggler {
    display: inline-block;
    cursor: pointer;
    margin: 10px;
}
.to-bar1, .to-bar2, .to-bar3 {
    width: 20px;
    height: 2px;
    background-color: grey;
    margin: 4px 0;
    transition: 0.2s;
    border-radius: 1px;
}
/* Rotate first bar */
.to-change .to-bar1 {
    -webkit-transform: rotate(45deg) translate(2px, 6px);
    transform: rotate(45deg) translate(2px, 6px);
}
/* Fade out the second bar */
.to-change .to-bar2 {
    opacity: 0;
}
/* Rotate last bar */
.to-change .to-bar3 {
    -webkit-transform: rotate(-45deg) translate(2px, -7px);
    transform: rotate(-45deg) translate(2px, -7px);
}

.navbar {
  transition: 0.4s;
}
.to-navbar-hidden {
  -webkit-transform: translate(0px, -100%);
  transform: translate(0px, -100%);
}
</style>
