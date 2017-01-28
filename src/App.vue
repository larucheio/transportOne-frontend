<template>
  <div>
    <nav id="navbar" class="navbar fixed-top navbar-toggleable-md navbar-light bg-faded px-3">
      <router-link class="navbar-brand" to="/home"><img src="./assets/logo.svg" height="30" alt="logo"></router-link>
      <div class="to-navbar-toggler navbar-toggler-right hidden-lg-up px-3" @click="animeHamburgerButton" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <div class="to-bar1"></div>
        <div class="to-bar2"></div>
        <div class="to-bar3"></div>
      </div>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
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
            <router-link class="nav-link" to="/admin" v-if="isAdmin">Admin</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" @click="login" v-if="!isAuthenticated">Se connecter</a>
            <a class="nav-link" @click="logout" v-else="isAuthenticated">Se déconnecter</a>
          </li>
        </ul>
      </div>
    </nav>
    <transition name="component-fade" mode="out-in">
      <router-view class="pt-5"></router-view>
    </transition>
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
    auth.refreshToken()
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
      $('.to-navbar-toggler').removeClass("to-change")
      window.scrollTo(0, 0)
    }
    return false;
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
  box-shadow: 0px 2px 10px #ccc;
}
.to-navbar-hidden {
  -webkit-transform: translate(0px, -100%);
  transform: translate(0px, -100%);
}

.nav-link {
    cursor: pointer;
}
</style>
