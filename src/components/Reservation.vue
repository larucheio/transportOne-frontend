<template>
  <div>
    <pricing></pricing>
  </div>
</template>

<script>
import Pricing from './Pricing.vue'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: { 'pricing': Pricing }
}
</script>

<style scoped>
</style>
