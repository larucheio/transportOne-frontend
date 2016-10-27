<template>
  <div>
    <h1>{{ title }}</h1>
    <h6>{{ text }}</h6>
    <pricing v-on:getPrice="showBooking"></pricing>
  </div>
</template>

<script>
import Pricing from './Pricing.vue'
export default {
  name: 'home',
  data () {
    return {
      title: 'Transport One',
      text: 'Transport One est...'
    }
  },
  components: { 'pricing': Pricing },
  methods: {
    showBooking: function () {
      this.$router.push('/tarifs')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
