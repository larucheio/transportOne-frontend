<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <nuxt-link class="navbar-brand" to="/">
      <img src="~assets/logo.svg" height="30" alt="Transport One logo">
    </nuxt-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <nuxt-link to="/commentcamarche" class="nav-link">Comment ça marche?</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/vehicule" class="nav-link">Véhicule</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/reservation" class="nav-link">Réservation</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/partenaires" class="nav-link">Partenaires & avis</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/contact" class="nav-link">Contact</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="isAdmin" to="/admin" class="nav-link">Admin</nuxt-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item" v-if="isAuthenticated">
          <nuxt-link to="/auth/sign-off" class="btn btn-primary btn-block">Se déconnecter</nuxt-link>
        </li>
        <li class="nav-item" v-else>
          <nuxt-link to="/auth/sign-in" class="btn btn-primary btn-block">Se connecter</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['isAuthenticated', 'isAdmin'])
}
</script>
