<template>
  <nav id="navbar" class="navbar fixed-top navbar-toggleable-md navbar-light bg-faded px-3 text-uppercase bg-lightgrey">
    <div class="to-navbar-toggler navbar-toggler-right hidden-lg-up px-3" @click="animeHamburgerButton" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <div class="to-bar1"></div>
      <div class="to-bar2"></div>
      <div class="to-bar3"></div>
    </div>
    <router-link class="navbar-brand mr-2" to="/"><img src="/static/logo.svg" height="30" alt="Transport One logo"></router-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <h1 class="h6 my-auto">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/commentcamarche">Comment ça marche?</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/vehicule">Véhicule</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/reservation">Réservation</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/partenaires">Partenaires &amp; avis</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin" v-if="isAdmin">Admin</router-link>
          </li>
        </ul>
      </h1>
      <div class="navbar-nav ml-auto">
        <button class="btn btn-primary"  @click="login" v-if="!isAuthenticated">Se connecter</button>
        <button class="btn btn-primary"  @click="logout" v-else="isAuthenticated">Se déconnecter</button>
      </div>
    </div>
  </nav>
</template>

<script>
import auth from '../../auth'

export default {
  props: [
    'isAuthenticated',
    'isAdmin'
  ],
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
    animeHamburgerButton () {
      $('.to-navbar-toggler').toggleClass('to-change')
    }
  }
}
let lastScroll = 0
$(window).scroll(function () {
  if ($(window).scrollTop() - lastScroll > 50) {
    $('#navbar').addClass('to-navbar-hidden')
    lastScroll = $(window).scrollTop()
  } else if ($(window).scrollTop() - lastScroll < -50) {
    $('#navbar').removeClass('to-navbar-hidden')
    lastScroll = $(window).scrollTop()
  }
})

// collapse mobile menu on click
$(document).ready(function () {
  $('.navbar-nav li a, .navbar-brand').click(function (event) {
    if ($(event.target).is('a')) {
      $('.collapse').collapse('hide')
      $('.to-navbar-toggler').removeClass('to-change')
      window.scrollTo(0, 0)
    }
    return false
  })
})
</script>

<style>
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
