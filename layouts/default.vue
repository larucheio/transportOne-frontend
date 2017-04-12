<template>
  <div>
    <Navbar/>
    <nuxt/>
    <FooterCustom/>
  </div>
</template>

<style src="element-ui/lib/theme-default/index.css"></style>

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
