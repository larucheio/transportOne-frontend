<template>
  <div>
    <Navbar/>
    <nuxt/>
    <FooterCustom/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'

export default {
  components: {
    Navbar,
    FooterCustom: Footer
  }
}
</script>
