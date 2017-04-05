<template>
  <div>
    <header>
      <nuxt-link to="/">Accueil</nuxt-link>
      <nuxt-link to="/partenaires">Partenaires</nuxt-link>
      <nuxt-link v-if="isAdmin" to="/admin">Admin</nuxt-link>
      <nuxt-link v-if="!isAuthenticated" to="/auth/sign-in">Sign In</nuxt-link>
      <nuxt-link v-else to="/auth/sign-off">Sign Off</nuxt-link>
    </header>
    <nuxt/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters(['isAuthenticated', 'isAdmin'])
}
</script>

<style>
</style>
