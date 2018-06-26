<template>
  <div>
    <transport-one-header :is-authenticated='isAuthenticated' :is-admin='isAdmin'/>
    <transition name="component-fade" mode="out-in">
      <router-view class="py-5 mb-6 mb-lg-5"></router-view>
    </transition>
    <transport-one-footer/>
  </div>
</template>

<script>
import auth from './auth'
import TransportOneHeader from './components/partials/Header.vue'
import TransportOneFooter from './components/partials/Footer.vue'

export default {
  data () {
    return {
      isAuthenticated: false,
      isAdmin: false
    }
  },
  created () {
    auth.handleAuthentication()
  },
  methods: {
    refreshAuthStatus () {
      this.isAuthenticated = auth.isAuthenticated()
      this.isAdmin = auth.isAdmin()
    }
  },
  components: {
    TransportOneHeader,
    TransportOneFooter
  }
}
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .1s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
</style>
